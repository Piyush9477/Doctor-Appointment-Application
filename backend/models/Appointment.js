const mongoose = require('mongoose');

// Appointment schema for managing appointment data in the database.
const appointmentSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['booked', 'completed'], default: 'booked' },
    discount_applied: { type: Number, default: 0 }
});

module.exports = mongoose.model('Appointment', appointmentSchema);