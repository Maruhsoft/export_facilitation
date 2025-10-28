
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EvidenceSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }, // URL to the file in cloud storage
    uploadedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});


const DisputeSchema = new mongoose.Schema({
  tradeId: {
    type: String,
    required: [true, 'Please add a trade ID'],
  },
  raisedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  parties: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  reason: {
    type: String,
    required: [true, 'Please provide a reason for the dispute'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  status: {
    type: String,
    enum: ['Open', 'Under Review', 'Resolved'],
    default: 'Open',
  },
  evidence: [EvidenceSchema],
  comments: [CommentSchema],
  resolution: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Dispute', DisputeSchema);
