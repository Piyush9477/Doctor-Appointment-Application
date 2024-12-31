const mongoose = require('mongoose');

// User schema for managing users data in the database.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor'], required: true },
    wallet_balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);