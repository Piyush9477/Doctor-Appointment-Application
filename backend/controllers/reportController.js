const Transaction = require("../models/Transaction");
const User = require("../models/User"); 

const generateReport = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Fetch user role 
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'patient') {
            // Logic for Patient Report
            const transactions = await Transaction.find({ patient_id: user_id }).populate('doctor_id');

            let totalAmountCredit = 0;
            let totalAmountDebit = 0;
            let discountTotal = 0;

            transactions.forEach((transaction) => {
                if (transaction.type === 'debit') {
                    totalAmountDebit += transaction.amount;
                    if (transaction.discount_used === true) {
                        discountTotal += transaction.amount;
                    }
                } else {
                    totalAmountCredit += transaction.amount;
                }
            });

            return res.status(200).json({
                role: 'patient',
                'Total Amount Credited': totalAmountCredit,
                'Total Amount Debited': totalAmountDebit,
                'Total Discount Applied': discountTotal
            });
        } 
        else if (user.role === 'doctor') {
            // Logic for Doctor Report
            const transactions = await Transaction.find({ doctor_id: user_id }).populate('patient_id');

            let totalAppointments = transactions.length;
            let newPatients = new Set(); // Unique new patients
            let revisits = 0;

            transactions.forEach((transaction) => {
                if (transaction.type === 'debit' && transaction.discount_used === true) {
                    // First-time visit
                    newPatients.add(transaction.patient_id.toString());
                } else if (transaction.type === 'debit') {
                    // Revisit
                    revisits++;
                }
            });

            return res.status(200).json({
                role: 'doctor',
                'Total number of appointments': totalAppointments,
                'Number of new patients visited': newPatients.size,
                'Number of revisits': revisits
            });
        } 
        else {
            return res.status(400).json({ message: "Invalid user role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { generateReport };
