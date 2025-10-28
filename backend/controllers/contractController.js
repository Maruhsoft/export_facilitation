const Contract = require('../models/Contract');
const Offer = require('../models/Offer');

// @desc    Create contract after offer acceptance
// @route   POST /api/contracts
// @access  Private
exports.createContract = async (req, res, next) => {
  try {
    const { offerId } = req.body;
    const offer = await Offer.findById(offerId);

    if (!offer || offer.status !== 'accepted') {
      return res.status(400).json({ success: false, message: 'Contract can only be created from an accepted offer.' });
    }
    
    // Ensure the user is part of the offer
    if (req.user.id.toString() !== offer.buyer.toString() && req.user.id.toString() !== offer.seller.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to create a contract for this offer.' });
    }

    const contractData = {
      offer: offerId,
      buyer: offer.buyer,
      seller: offer.seller,
    };

    const contract = await Contract.create(contractData);
    res.status(201).json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve all contracts (filtered by role)
// @route   GET /api/contracts
// @access  Private
exports.getContracts = async (req, res, next) => {
  try {
    let query;
    const user = req.user;

    if (user.role === 'superadmin' || user.role === 'payment_admin') {
      query = Contract.find();
    } else {
      query = Contract.find({ $or: [{ buyer: user.id }, { seller: user.id }] });
    }

    const contracts = await query.populate('buyer', 'fullName').populate('seller', 'fullName');
    res.status(200).json({ success: true, count: contracts.length, data: contracts });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve contract details
// @route   GET /api/contracts/:id
// @access  Private
exports.getContractById = async (req, res, next) => {
  res.status(200).json({ success: true, message: `Get contract ${req.params.id} placeholder` });
};

// @desc    Update terms or clauses
// @route   PATCH /api/contracts/:id
// @access  Private
exports.updateContract = async (req, res, next) => {
  res.status(200).json({ success: true, message: `Update contract ${req.params.id} placeholder` });
};

// @desc    Digitally sign contract
// @route   POST /api/contracts/:id/sign
// @access  Private
exports.signContract = async (req, res, next) => {
  res.status(200).json({ success: true, message: `Sign contract ${req.params.id} placeholder` });
};

// @desc    Terminate or cancel contract
// @route   POST /api/contracts/:id/terminate
// @access  Private/Admin
exports.terminateContract = async (req, res, next) => {
  res.status(200).json({ success: true, message: `Terminate contract ${req.params.id} placeholder` });
};
