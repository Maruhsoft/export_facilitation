const mongoose = require('mongoose');
const Setting = require('../models/Setting');
const { seedData: runSeed } = require('../config/seed');

// @desc    Retrieve system settings
// @route   GET /api/system/settings
// @access  Private/SuperAdmin
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.find();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update global configuration
// @route   PATCH /api/system/settings
// @access  Private/SuperAdmin
exports.updateSettings = async (req, res, next) => {
  // Placeholder: expecting an array of key-value pairs to update
  res.status(200).json({ success: true, message: 'Update settings placeholder' });
};

// @desc    Seed initial data
// @route   POST /api/system/seed
// @access  Private/SuperAdmin
exports.seedData = async (req, res, next) => {
  try {
    await runSeed();
    res.status(200).json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    System health, uptime, and database connection
// @route   GET /api/system/status
// @access  Public
exports.getSystemStatus = (req, res, next) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    dbConnection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
};
