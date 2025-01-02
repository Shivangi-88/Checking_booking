const express = require('express');
const {
  getAppointments,
  addAppointment,
  markNoShow,
  findAvailableSlots,
  rescheduleAppointment,
  deleteAppointment,

} = require('../controllers/appointmentController');

const router = express.Router();

// Ensure this function is used properly
router.get('/', getAppointments);
// In routes/appointments.js
router.get('/check', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Other routes
router.post('/', addAppointment);
router.patch('/:id/no-show', markNoShow);
router.get('/:doctorId/slots', findAvailableSlots);
router.put('/:id/reschedule', rescheduleAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;

