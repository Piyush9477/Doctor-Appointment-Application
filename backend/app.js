const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const walletRoutes = require('./routes/walletRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // Load environment variables from the .env file

const app = express(); // Create an instance of the express app

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); 

connectDB(); // Establish a connection to the database

// Set up route handlers for different API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/users', userRoutes);

module.exports = app; // Export the app