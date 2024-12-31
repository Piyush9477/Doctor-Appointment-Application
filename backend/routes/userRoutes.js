const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }, 'name _id');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

module.exports = router;