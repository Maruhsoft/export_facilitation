const express = require('express');
const {
  initializePayment,
  submitManualPayment,
  getPaymentStatus,
  confirmPayment,
  getPaymentHistory
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/initialize', initializePayment);
router.post('/manual', submitManualPayment);
router.post('/confirm/:transactionId', authorize('payment_admin'), confirmPayment);

router.get('/history', getPaymentHistory);
router.get('/status/:transactionId', getPaymentStatus);


module.exports = router;
