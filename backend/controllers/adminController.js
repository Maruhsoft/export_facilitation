const User = require('../models/User');
const Trade = require('../models/Trade');
const Payment = require('../models/Payment');
const Company = require('../models/Company');
const Dispute = require('../models/Dispute');


// @desc    Retrieve global metrics (users, trades, revenue)
// @route   GET /api/admin/overview
// @access  Private/Admin
exports.getDashboardOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrades = await Trade.countDocuments();
    const pendingVerifications = await Company.countDocuments({ kycStatus: 'pending' });
    const openDisputes = await Dispute.countDocuments({ status: { $in: ['Open', 'Under Review'] } });
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalTrades,
        pendingVerifications,
        openDisputes,
      }
    });
  } catch(error) {
    next(error);
  }
};

// @desc    Retrieve system audit logs
// @route   GET /api/admin/audit-logs
// @access  Private/SuperAdmin
exports.getAuditLogs = async (req, res, next) => {
  // Placeholder for audit logging feature
  res.status(200).json({ success: true, message: 'Get audit logs placeholder' });
};

// @desc    Review pending manual payment proofs
// @route   GET /api/admin/manual-payments
// @access  Private/Admin
exports.getPendingManualPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ paymentMethod: 'manual', status: 'pending' });
    res.status(200).json({ success: true, count: payments.length, data: payments });
  } catch(error) {
    next(error);
  }
};

// @desc    Approve manual payment
// @route   PATCH /api/admin/manual-payments/:id/approve
// @access  Private/Admin
exports.approveManualPayment = async (req, res, next) => {
  // Placeholder
  res.status(200).json({ success: true, message: `Approve manual payment ${req.params.id} placeholder` });
};

// @desc    Reject manual payment
// @route   PATCH /api/admin/manual-payments/:id/reject
// @access  Private/Admin
exports.rejectManualPayment = async (req, res, next) => {
  // Placeholder
  res.status(200).json({ success: true, message: `Reject manual payment ${req.params.id} placeholder` });
};