const express = require('express');
const { addWalletBalance } = require('../controllers/walletController');
const router = express.Router(); // Create a new router instance for handling routes

router.post('/addBalance', addWalletBalance); // Define a POST route to add balance in wallet

module.exports = router; //Export the router