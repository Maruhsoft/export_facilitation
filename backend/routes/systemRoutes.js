const express = require('express');
const {
  getSettings,
  updateSettings,
  seedData,
  getSystemStatus,
} = require('../controllers/systemController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/status', getSystemStatus);

// Protected and Admin only routes
router.use(protect);
router.use(authorize('superadmin'));

router.route('/settings')
    .get(getSettings)
    .patch(updateSettings);

router.post('/seed', seedData);


module.exports = router;
