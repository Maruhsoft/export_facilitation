const express = require('express');
const {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  signContract,
  terminateContract,
} = require('../controllers/contractController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(authorize('buyer', 'vendor'), createContract)
  .get(getContracts);

router.route('/:id')
  .get(getContractById)
  .patch(authorize('buyer', 'vendor', 'superadmin'), updateContract);

router.post('/:id/sign', signContract);
router.post('/:id/terminate', authorize('superadmin'), terminateContract);

module.exports = router;
