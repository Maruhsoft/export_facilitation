const express = require('express');
const {
  registerCompany,
  getCompanies,
  getCompanyDetails,
  updateCompanyDetails,
  uploadKyc,
  getKycStatus,
  verifyKyc,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .post(registerCompany)
    .get(authorize('superadmin'), getCompanies);

router.route('/:id')
    .get(getCompanyDetails)
    .patch(updateCompanyDetails);

router.post('/kyc/upload', uploadKyc);
router.get('/kyc/status', getKycStatus);
router.patch('/kyc/verify/:id', authorize('superadmin'), verifyKyc);


module.exports = router;
