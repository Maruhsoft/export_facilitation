const Offer = require('../models/Offer');
const Trade = require('../models/Trade');
const Escrow = require('../models/Escrow');
const Contract = require('../models/Contract');
const Notification = require('../models/Notification');
const Payment = require('../models/Payment');

// @desc    Get dashboard stats for a Seller
// @route   GET /api/dashboard/seller
// @access  Private (Vendor only)
exports.getSellerDashboardStats = async (req, res, next) => {
    try {
        const sellerId = req.user.id;

        const activeListings = await Offer.countDocuments({ 
            seller: sellerId,
            status: { $in: ['pending', 'negotiating'] }
        });

        const newTradeRequests = await Trade.countDocuments({
            seller: sellerId,
            status: 'request_pending'
        });

        // To calculate funds in escrow, we need to find contracts where user is seller,
        // then find escrows for those contracts.
        const contracts = await Contract.find({ seller: sellerId }).select('_id');
        const contractIds = contracts.map(c => c._id);
        
        const fundedEscrows = await Escrow.find({
            contract: { $in: contractIds },
            status: 'funded'
        });

        const fundsInEscrow = fundedEscrows.reduce((acc, escrow) => acc + escrow.amount, 0);

        res.status(200).json({
            success: true,
            data: {
                activeListings,
                newTradeRequests,
                fundsInEscrow: fundsInEscrow.toFixed(2),
            }
        });
    } catch (error) {
        next(error);
    }
};


// @desc    Get dashboard stats for a Buyer
// @route   GET /api/dashboard/buyer
// @access  Private (Buyer only)
exports.getBuyerDashboardStats = async (req, res, next) => {
    try {
        const buyerId = req.user.id;

        const trades = await Trade.find({ buyer: buyerId });

        const activeTrades = trades.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length;
        const pendingPayments = trades.filter(t => t.status === 'payment_pending').length;
        
        const unreadMessages = await Notification.countDocuments({ user: buyerId, isRead: false });

        res.status(200).json({
            success: true,
            data: {
                activeTrades,
                pendingPayments,
                unreadMessages,
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard stats for a Payment Admin
// @route   GET /api/dashboard/payment-admin
// @access  Private (Payment Admin only)
exports.getPaymentAdminDashboardStats = async (req, res, next) => {
    try {
        const pendingManualPayments = await Payment.countDocuments({
            paymentMethod: 'manual',
            status: 'pending'
        });

        const completedTransactionsToday = await Payment.countDocuments({
            status: 'completed',
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
        });

        const totalEscrowed = await Escrow.aggregate([
            { $match: { status: 'funded' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                pendingManualPayments,
                completedTransactionsToday,
                totalEscrowed: totalEscrowed.length > 0 ? totalEscrowed[0].total : 0,
            }
        });
    } catch (error) {
        next(error);
    }
};
