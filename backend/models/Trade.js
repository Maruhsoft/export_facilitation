const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  productName: {
    type: String,
    required: [true, 'Please add a product name/description'],
  },
  quantity: {
    type: String,
    required: [true, 'Please specify quantity'],
  },
  targetPrice: {
    type: Number,
    required: [true, 'Please specify a target price'],
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination'],
  },
  additionalDetails: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      'request_pending',
      'negotiating',
      'agreement_reached',
      'payment_pending',
      'shipment_in_progress',
      'completed',
      'cancelled',
      'disputed'
    ],
    default: 'request_pending',
  },
  // We can add references to other models as the trade progresses
  offer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Offer'
  },
  contract: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contract'
  },
  shipment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shipment'
  },
  payment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Payment'
  },
  dispute: {
      type: mongoose.Schema.ObjectId,
      ref: 'Dispute'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trade', TradeSchema);