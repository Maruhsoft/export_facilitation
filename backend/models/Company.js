const mongoose = require('mongoose');

const KycDocumentSchema = new mongoose.Schema({
    documentType: {
        type: String,
        enum: ['certificate_of_incorporation', 'proof_of_address', 'id_document'],
        required: true,
    },
    fileUrl: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

const CompanySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: [true, 'Please add a company name']
    },
    cacNumber: {
        type: String,
        required: [true, 'Please add a CAC registration number']
    },
    kycStatus: {
        type: String,
        enum: ['unverified', 'pending', 'verified', 'rejected'],
        default: 'unverified'
    },
    documents: [KycDocumentSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Company', CompanySchema);
