const mongoose = require('mongoose');

const NegotiationHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    terms: { type: String }, // e.g., "Changed price to $2400"
    createdAt: { type: Date, default: Date.now }
});

const OfferSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    buyer: { // Can be null if it's a public offer
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    productName: {
        type: String,
        required: [true, 'Please add a product name']
    },
    description: {
        type: String,
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'negotiating', 'accepted', 'rejected', 'expired'],
        default: 'pending'
    },
    negotiationHistory: [NegotiationHistorySchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date
    }
});

module.exports = mongoose.model('Offer', OfferSchema);
