const express = require('express'); 
const { bookAppointment } = require('../controllers/appointmentController');
const router = express.Router(); // Create a new router instance for handling routes

router.post('/book', bookAppointment); // Define a POST route for booking an appointment

module.exports = router; //Export the router