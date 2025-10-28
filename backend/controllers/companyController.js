const Company = require('../models/Company');

// @desc    Register company information
// @route   POST /api/companies
// @access  Private
exports.registerCompany = async (req, res, next) => {
  // Placeholder: this logic is partially in authController, can be expanded here
  res.status(201).json({ success: true, message: 'Company registered placeholder' });
};

// @desc    List all companies
// @route   GET /api/companies
// @access  Private/Admin
exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().populate('user', 'fullName email');
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch(err) {
    next(err);
  }
};

// @desc    Retrieve company details
// @route   GET /api/companies/:id
// @access  Private
exports.getCompanyDetails = async (req, res, next) => {
  // Placeholder: Get company, check if user is owner or admin
  res.status(200).json({ success: true, message: `Get company ${req.params.id} placeholder` });
};

// @desc    Update company details
// @route   PATCH /api/companies/:id
// @access  Private
exports.updateCompanyDetails = async (req, res, next) => {
  // Placeholder: Update company, check if user is owner or admin
  res.status(200).json({ success: true, message: `Update company ${req.params.id} placeholder` });
};

// @desc    Upload KYC documents
// @route   POST /api/kyc/upload
// @access  Private
exports.uploadKyc = async (req, res, next) => {
  // Placeholder: Handle file uploads (e.g., to S3) and update company model
  res.status(200).json({ success: true, message: 'KYC uploaded placeholder' });
};

// @desc    Check verification status
// @route   GET /api/kyc/status
// @access  Private
exports.getKycStatus = async (req, res, next) => {
  // Placeholder: Get user's company and return kycStatus
  res.status(200).json({ success: true, message: 'Get KYC status placeholder' });
};

// @desc    Approve or reject KYC
// @route   PATCH /api/kyc/verify/:id
// @access  Private/Admin
exports.verifyKyc = async (req, res, next) => {
  // Placeholder: Admin updates a company's kycStatus
  res.status(200).json({ success: true, message: `Verify KYC for company ${req.params.id} placeholder` });
};
