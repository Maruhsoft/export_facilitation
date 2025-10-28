const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  trade: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trade',
    required: true,
  },
  freightAgency: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // User with 'freight_agency' role
  },
  trackingNumber: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered', 'delayed'],
    default: 'pending',
  },
  proofOfDeliveryUrl: {
    type: String,
  },
  estimatedDeliveryDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
