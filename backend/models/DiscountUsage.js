const mongoose = require('mongoose');

// Discount Usage schema for managing discounts data in the database.
const discountUsagechema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    is_used: { type: Boolean, default: false }
});

module.exports = mongoose.model('DiscountUsage', discountUsagechema);