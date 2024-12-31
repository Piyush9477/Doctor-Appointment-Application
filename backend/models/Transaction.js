const mongoose = require('mongoose');

// Transaction schema for managing transaction data in the database.
const transactionSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    amount: { type: Number, required: true},
    type: { type: String, enum: ['debit','credit'], required: true },
    discount_used: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);