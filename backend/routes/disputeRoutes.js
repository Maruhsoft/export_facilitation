const express = require('express');
const {
  createDispute,
  getDisputes,
  getDisputeById,
  updateDispute,
  addComment,
  escalateDispute,
  resolveDispute,
} = require('../controllers/disputeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Disputes
 *   description: Dispute resolution management
 */

/**
 * @swagger
 * /api/disputes:
 *   post:
 *     summary: Create a new dispute for a trade
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DisputeInput'
 *     responses:
 *       '201':
 *         description: Dispute created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispute'
 *       '400':
 *         description: Bad request
 *   get:
 *     summary: Get all disputes relevant to the user (or all for admins)
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of disputes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dispute'
 */
router.route('/')
  .post(createDispute)
  .get(getDisputes);

/**
 * @swagger
 * /api/disputes/{id}:
 *   get:
 *     summary: Get a single dispute by ID
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Dispute details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispute'
 *       '404':
 *         description: Dispute not found
 *   patch:
 *     summary: Update a dispute (add comment or update status for admins)
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: A new comment to add to the dispute.
 *               status:
 *                 type: string
 *                 enum: [Open, 'Under Review', Resolved]
 *                 description: New status (Admin only).
 *               resolution:
 *                 type: string
 *                 description: Final resolution text (Admin only).
 *     responses:
 *       '200':
 *         description: Dispute updated
 *       '403':
 *         description: Not authorized to update this dispute
 */
router.route('/:id')
  .get(getDisputeById)
  .patch(updateDispute); // For adding comments, evidence, or admin updates

router.post('/:id/escalate', authorize('superadmin'), escalateDispute);
router.post('/:id/resolve', authorize('superadmin', 'payment_admin'), resolveDispute);

// This route is now combined into the PATCH /:id route for simplicity
// router.route('/:id/comments')
//     .post(addComment);

module.exports = router;
