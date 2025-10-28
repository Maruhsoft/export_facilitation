const Dispute = require('../models/Dispute');
const User = require('../models/User');

// @desc    Create a new dispute
// @route   POST /api/disputes
// @access  Private
exports.createDispute = async (req, res, next) => {
  try {
    req.body.raisedBy = req.user.id;
    // In a real app, you'd look up the contract to get all parties
    req.body.parties = [req.user.id, req.body.counterpartyId]; 

    const dispute = await Dispute.create(req.body);

    res.status(201).json({
      success: true,
      data: dispute,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all disputes
// @route   GET /api/disputes
// @access  Private
exports.getDisputes = async (req, res, next) => {
  try {
    let query;
    const user = req.user;

    if (user.role !== 'superadmin' && user.role !== 'payment_admin') {
      query = Dispute.find({ parties: user._id });
    } else {
      query = Dispute.find();
    }
    
    const disputes = await query.populate('raisedBy', 'fullName').populate('parties', 'fullName');

    res.status(200).json({
      success: true,
      count: disputes.length,
      data: disputes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single dispute by ID
// @route   GET /api/disputes/:id
// @access  Private
exports.getDisputeById = async (req, res, next) => {
  try {
    const dispute = await Dispute.findById(req.params.id)
      .populate('raisedBy', 'fullName email')
      .populate('parties', 'fullName email')
      .populate('comments.user', 'fullName email');

    if (!dispute) {
      return res.status(404).json({ success: false, message: 'Dispute not found' });
    }

    const isParty = dispute.parties.some(party => party._id.equals(req.user._id));
    const isAdmin = req.user.role === 'superadmin' || req.user.role === 'payment_admin';

    if (!isParty && !isAdmin) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this dispute' });
    }

    res.status(200).json({
      success: true,
      data: dispute,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a dispute (add comment, evidence, or admin updates status)
// @route   PATCH /api/disputes/:id
// @access  Private
exports.updateDispute = async (req, res, next) => {
    try {
        const dispute = await Dispute.findById(req.params.id);
        if (!dispute) {
            return res.status(404).json({ success: false, message: 'Dispute not found' });
        }

        const isParty = dispute.parties.some(partyId => partyId.equals(req.user._id));
        const isAdmin = req.user.role === 'superadmin' || req.user.role === 'payment_admin';

        if (!isParty && !isAdmin) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this dispute' });
        }

        // Add a comment
        if (req.body.comment) {
            dispute.comments.push({ user: req.user._id, message: req.body.comment });
        }

        // Admin can update status and resolution
        if (isAdmin) {
            if (req.body.status) dispute.status = req.body.status;
            if (req.body.resolution) dispute.resolution = req.body.resolution;
        }

        await dispute.save();

        res.status(200).json({ success: true, data: dispute });
    } catch (error) {
        next(error);
    }
};

// @desc    Escalate dispute to arbitration
// @route   POST /api/disputes/:id/escalate
// @access  Private/Admin
exports.escalateDispute = async (req, res, next) => {
    // Placeholder: change status to 'Arbitration' or similar
    res.status(200).json({ success: true, message: `Dispute ${req.params.id} escalated` });
};

// @desc    Resolve or close dispute
// @route   POST /api/disputes/:id/resolve
// @access  Private/Admin
exports.resolveDispute = async (req, res, next) => {
    // Placeholder: change status to 'Resolved', potentially trigger escrow action
    res.status(200).json({ success: true, message: `Dispute ${req.params.id} resolved` });
};
