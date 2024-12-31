const Appointment = require('../models/Appointment');
const DiscountUsage = require('../models/DiscountUsage');
const User = require('../models/User');
const Transaction = require("../models/Transaction");

const bookAppointment = async (req, res) => {
    const { doctorId, patientId, amount } = req.body; // Extract doctorId, patientId, and amount from the request body

    const isDiscountUsed = await DiscountUsage.findOne({ patient_id: patientId, doctor_id: doctorId }); // Check if the patient has already used a discount with the same doctor

    let discount = 0;
    let discountUsed = false;
    if(!isDiscountUsed){
        discountUsed = true;
        discount = 0.1 * amount; // Apply a 10% discount if it's the patient's first appointment with the doctor
        await DiscountUsage.create({ patient_id: patientId, doctor_id: doctorId, is_used: true });
    }

    const finalAmount = amount - discount; // Calculate the final payable amount after discount
    const patient = await User.findById(patientId); // Retrieve the patient
    const doctor = await User.findById(doctorId); // Retrieve the doctor

    if (patient.wallet_balance < finalAmount) {
        return res.status(400).send('Insufficient balance');
    }
    
    patient.wallet_balance -= finalAmount; // Deduct the final amount from the patient's wallet
    await patient.save();

    doctor.wallet_balance += finalAmount; // Add the final amount to doctor's wallet
    await doctor.save();
    
    // Create a transaction record
    const transaction = new Transaction({
        doctor_id: doctorId,
        patient_id: patientId,
        amount: finalAmount,
        type: 'debit',
        discount_used : discountUsed
    });
    await transaction.save();

    await Appointment.create({ doctor_id: doctorId, patient_id: patientId, discount_applied: discount }); // Create an appointment entry
    res.status(200).send({ message: 'Appointment booked successfully', finalAmount, "Discount Applied": discount });
};

module.exports = { bookAppointment }; // Export the controller function