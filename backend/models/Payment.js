const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { // User initiating the payment
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  trade: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trade',
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'in_escrow'],
    default: 'pending',
  },
  paymentType: {
    type: String,
    enum: ['escrow', 'wallet_funding', 'withdrawal', 'direct_payment'],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['automatic', 'manual'],
    default: 'automatic'
  },
  transactionRef: { // Reference from payment gateway or manual transfer
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
