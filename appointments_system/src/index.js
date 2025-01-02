const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const appointmentsRouter = require('./routes/appointments');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const doctorController = require('./controllers/doctorController');
const appointmentController = require('./controllers/appointmentController');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB();
const doctor = new Doctor({
  name: "Dr. Sarah Lee",
  specialty: "Dermatologist",
  schedule: [
    {
      date: "2024-12-31",
      slots: ["09:00", "10:00", "11:00"]
    }
  ]
});

doctor.save()
  .then((newDoctor) => {
    console.log('Doctor saved:', newDoctor);
  })
  .catch((err) => {
    console.error('Error saving doctor:', err);
  });

// Insert Appointment
const appointment = new Appointment({
  patientName: "John Doe",
  doctorId: "605c72ef1532073f4b8978b7", // Replace with actual Doctor's ObjectId
  date: "2024-12-31",
  time: "09:00"
});

appointment.save()
  .then((newAppointment) => {
    console.log('Appointment saved:', newAppointment);
  })
  .catch((err) => {
    console.error('Error saving appointment:', err);
  });
// Routes
app.use('/appointments', appointmentsRouter);

// Default Route
app.post('/appointments/reschedule', appointmentController.rescheduleAppointment);

app.post('/appointments', appointmentController.addAppointment);
app.post('/doctors', doctorController.addDoctor);
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({}, 'doctorName');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Middleware for error handling

app.use(errorMiddleware);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

