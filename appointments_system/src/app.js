const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
