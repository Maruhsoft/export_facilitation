const express = require('express');
const {
  getDashboardOverview,
  getAuditLogs,
  getPendingManualPayments,
  approveManualPayment,
  rejectManualPayment,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('superadmin', 'payment_admin'));

router.get('/overview', getDashboardOverview);
router.get('/audit-logs', authorize('superadmin'), getAuditLogs);
router.get('/manual-payments', getPendingManualPayments);
router.patch('/manual-payments/:id/approve', approveManualPayment);
router.patch('/manual-payments/:id/reject', rejectManualPayment);

module.exports = router;
