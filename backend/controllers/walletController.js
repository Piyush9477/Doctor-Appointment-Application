const User = require('../models/User');
const Transaction = require('../models/Transaction');

const addWalletBalance = async (req, res) => {
    try{
        const { patientId, amount } = req.body; // Extract patientId and amount from the request body
        const patient = await User.findById(patientId); // Find the patient by ID

        if( !patient ){
            return res.status(400).send('Patient not found');
        }

        patient.wallet_balance += amount; // Update the wallet balance
        await patient.save();

        // Record the transaction as a credit
        const transaction = new Transaction({
            patient_id: patientId,
            amount,
            type: 'credit'
        });
        await transaction.save();

        res.status(200).send({message: 'Wallet balance added successfully', wallet_balance: patient.wallet_balance});
    }catch(error){
        console.error('Error adding balance to wallet:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { addWalletBalance }; // Export the wallet controller function