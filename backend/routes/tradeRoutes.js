const express = require('express');
const {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade
} = require('../controllers/tradeController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Trades
 *   description: Trade request and management
 */

/**
 * @swagger
 * /api/trades:
 *   post:
 *     summary: Create a new trade request (Buyer only)
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TradeInput'
 *     responses:
 *       '201':
 *         description: Trade request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trade'
 *       '403':
 *         description: Forbidden, only buyers can create trades.
 *   get:
 *     summary: Get trades for the current user (or all trades for admin)
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of trades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trade'
 */
router
  .route('/')
  .post(authorize('buyer'), createTrade)
  .get(getTrades);

router
  .route('/:id')
  .get(getTradeById)
  .patch(updateTrade)
  .delete(authorize('superadmin'), deleteTrade);

module.exports = router;
