const express = require('express');
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  assignPermission,
} = require('../controllers/roleController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All routes are protected and restricted to superadmins
router.use(protect);
router.use(authorize('superadmin'));

router
  .route('/')
  .get(getRoles)
  .post(createRole);

router
  .route('/:id')
  .patch(updateRole)
  .delete(deleteRole);

router.post('/permissions/assign', assignPermission);

module.exports = router;
