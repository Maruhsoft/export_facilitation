const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    offer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Offer',
        required: true
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    productName: String,
    quantity: String,
    price: Number,
    status: {
        type: String,
        enum: ['active', 'payment_pending', 'in_transit', 'completed', 'disputed', 'cancelled'],
        default: 'active'
    },
    contractUrl: { // Link to a digital contract PDF
        type: String
    },
    payment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Payment'
    },
    shipment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shipment'
    },
    escrow: {
        type: mongoose.Schema.ObjectId,
        ref: 'Escrow'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Populate fields from the offer before saving
ContractSchema.pre('save', async function(next) {
    if (this.isNew) {
        const offer = await mongoose.model('Offer').findById(this.offer);
        if (offer) {
            this.productName = offer.productName;
            this.quantity = offer.quantity;
            this.price = offer.price;
        }
    }
    next();
});

module.exports = mongoose.model('Contract', ContractSchema);
