const express = require('express');
const { 
    getSellerDashboardStats,
    getBuyerDashboardStats,
    getPaymentAdminDashboardStats
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/seller', authorize('vendor'), getSellerDashboardStats);
router.get('/buyer', authorize('buyer'), getBuyerDashboardStats);
router.get('/payment-admin', authorize('payment_admin'), getPaymentAdminDashboardStats);


module.exports = router;
