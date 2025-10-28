const mongoose = require('mongoose');

const EscrowSchema = new mongoose.Schema({
  contract: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contract',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  serviceCharge: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'funded', 'released', 'refunded', 'disputed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  releasedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Escrow', EscrowSchema);
