const Trade = require('../models/Trade');

// @desc    Create a new trade request
// @route   POST /api/trades
// @access  Private (Buyers only)
exports.createTrade = async (req, res, next) => {
  try {
    req.body.buyer = req.user.id;
    const trade = await Trade.create(req.body);
    res.status(201).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trades for a user or all trades for admin
// @route   GET /api/trades
// @access  Private
exports.getTrades = async (req, res, next) => {
  try {
    let query;
    const user = req.user;

    // Admins see all trades
    if (user.role === 'superadmin' || user.role === 'payment_admin') {
      query = Trade.find();
    } else {
      // Users see trades they are a party to (buyer or seller)
      query = Trade.find({ $or: [{ buyer: user.id }, { seller: user.id }] });
    }

    const trades = await query.populate('buyer', 'fullName').populate('seller', 'fullName');

    res.status(200).json({
      success: true,
      count: trades.length,
      data: trades,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trade by ID
// @route   GET /api/trades/:id
// @access  Private
exports.getTradeById = async (req, res, next) => {
  try {
    const trade = await Trade.findById(req.params.id)
      .populate('buyer', 'fullName email')
      .populate('seller', 'fullName email');

    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }

    // Check if user is authorized to view this trade
    const isParty = trade.buyer._id.equals(req.user.id) || (trade.seller && trade.seller._id.equals(req.user.id));
    const isAdmin = req.user.role === 'superadmin' || req.user.role === 'payment_admin';

    if (!isParty && !isAdmin) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this trade' });
    }

    res.status(200).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a trade
// @route   PATCH /api/trades/:id
// @access  Private
exports.updateTrade = async (req, res, next) => {
  try {
    let trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }

    // Check permissions before updating
    const isParty = trade.buyer.equals(req.user.id) || (trade.seller && trade.seller.equals(req.user.id));
    const isAdmin = req.user.role === 'superadmin' || req.user.role === 'payment_admin';

    if (!isParty && !isAdmin) {
        return res.status(403).json({ success: false, message: 'Not authorized to update this trade' });
    }

    trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: trade });
  } catch (error) {
    next(error);
  }
};


// @desc    Delete a trade
// @route   DELETE /api/trades/:id
// @access  Private (Admin only)
exports.deleteTrade = async (req, res, next) => {
    try {
        const trade = await Trade.findById(req.params.id);
        if (!trade) {
            return res.status(404).json({ success: false, message: 'Trade not found' });
        }
        await trade.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
