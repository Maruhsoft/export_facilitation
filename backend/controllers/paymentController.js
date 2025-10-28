const Payment = require('../models/Payment');

// @desc    Start automatic payment (via gateway)
// @route   POST /api/payments/initialize
// @access  Private
exports.initializePayment = async (req, res, next) => {
    try {
        // Placeholder logic:
        // 1. Call payment gateway service (e.g., Paystack, Stripe)
        // 2. Create a 'pending' Payment document in the database
        const paymentData = {
            ...req.body,
            user: req.user.id,
            status: 'pending',
            paymentMethod: 'automatic'
        };
        const payment = await Payment.create(paymentData);
        res.status(201).json({
            success: true,
            message: 'Payment initialized successfully. Awaiting confirmation from gateway.',
            data: {
                payment,
                // In a real app, you would return a checkout URL from the gateway
                checkoutUrl: 'https://payment.gateway/checkout/xyz'
            }
        });
    } catch(error) {
        next(error);
    }
};

// @desc    Submit proof for manual payment
// @route   POST /api/payments/manual
// @access  Private
exports.submitManualPayment = async (req, res, next) => {
    // Placeholder: Create payment record with 'pending' status for manual verification
    res.status(201).json({ success: true, message: 'Manual payment proof submitted for review.' });
};

// @desc    Check payment status
// @route   GET /api/payments/status/:transactionId
// @access  Private
exports.getPaymentStatus = async (req, res, next) => {
    // Placeholder: Check status in DB or query payment gateway
    res.status(200).json({ success: true, message: `Status for ${req.params.transactionId} is pending.` });
};

// @desc    Confirm manual or delayed payment
// @route   POST /api/payments/confirm/:transactionId
// @access  Private/Admin
exports.confirmPayment = async (req, res, next) => {
    // Placeholder: Admin confirms a manual payment, updates status to 'completed'
    res.status(200).json({ success: true, message: `Payment ${req.params.transactionId} confirmed.` });
};

// @desc    Get payment history for a user
// @route   GET /api/payments/history
// @access  Private
exports.getPaymentHistory = async (req, res, next) => {
    try {
        const query = (req.user.role === 'superadmin' || req.user.role === 'payment_admin')
            ? {}
            : { user: req.user.id };
        const payments = await Payment.find(query).populate('trade', 'productName');
        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        next(error);
    }
};
