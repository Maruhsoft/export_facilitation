const express = require('express');
const {
  initiateEscrow,
  getEscrowDetails,
  releaseFunds,
  refundBuyer,
} = require('../controllers/escrowController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/initiate', authorize('buyer'), initiateEscrow);
router.get('/:id', getEscrowDetails);
router.patch('/:id/release', authorize('payment_admin', 'superadmin'), releaseFunds);
router.patch('/:id/refund', authorize('payment_admin', 'superadmin'), refundBuyer);

module.exports = router;
