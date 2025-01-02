const express = require('express');
const {
  getDoctors,
  addDoctor,
  getDoctorById,
  getAvailableSlots,
  updateDoctorSchedule,
} = require('../controllers/doctorController');

const router = express.Router();

// Get all doctors
router.get('/', getDoctors);

// Add a new doctor
router.post('/', addDoctor);

// Get a specific doctor by ID
router.get('/:id', getDoctorById);

// Get available slots for a specific doctor
router.get('/:id/slots', getAvailableSlots);

// Update a doctor's schedule
router.put('/:id/schedule', updateDoctorSchedule);

module.exports = router;
