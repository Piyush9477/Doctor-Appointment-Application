const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router(); // Create a new router instance for handling routes

router.post('/register', register); // Define a POST route for register
router.post('/login', login); // Define a POST route for login

module.exports = router; //Export the router