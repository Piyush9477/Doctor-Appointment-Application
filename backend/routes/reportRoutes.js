const express = require('express');
const { generateReport } = require('../controllers/reportController');
const router = express.Router(); // Create a new router instance for handling routes

router.post('/generate', generateReport); // Define a POST route to generate report
 
module.exports = router; //Export the router