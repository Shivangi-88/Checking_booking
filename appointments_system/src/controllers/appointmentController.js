const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.getAppointments = async (req, res) => {
  try {
    // Fetch all appointments from the database
    const appointments = await Appointment.find().populate('doctorId');

    // Check if no appointments exist
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found' });
    }

    // Return the appointments data
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.addAppointment = async (req, res) => {
  const { patientName, doctorId, date, time, status } = req.body;

  // Validate required fields
  if (!patientName || !doctorId || !date || !time || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new appointment instance
    const appointment = new Appointment({
      patientName,
      doctorId,
      date,
      time,
      status,
    });

    // Save the appointment to the database
    const newAppointment = await appointment.save();
    
    // Respond with the saved appointment data
    res.status(201).json({
      message: 'Appointment created successfully',
      newAppointment,
    });
  } catch (error) {
    // Handle any errors that occur during the appointment creation
    res.status(500).json({ error: `Failed to create appointment: ${error.message}` });
  }
};


exports.markNoShow = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check if the appointment is already marked as missed
    if (appointment.status === 'missed') {
      return res.status(400).json({ message: 'This appointment is already marked as missed' });
    }

    // Check if the appointment is within the 15-minute grace period
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
    const currentDateTime = new Date();
    
    // If it's more than 15 minutes after the appointment time, mark as missed
    if (currentDateTime - appointmentDateTime > 15 * 60 * 1000) {
      appointment.status = 'missed';  // Mark as missed
      await appointment.save();

      return res.status(200).json({ message: 'Appointment marked as missed' });
    } else {
      return res.status(400).json({ message: 'Grace period not over yet' });
    }

  } catch (error) {
    console.error('Error marking no-show appointment:', error);
    res.status(500).json({ error: 'Failed to mark the appointment as missed' });
  }
};


exports.findAvailableSlots = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    // Step 1: Fetch doctor from the database by doctorId
    const doctor = await Doctor.findById(doctorId);

    // Step 2: Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Step 3: Check if the doctor's schedule exists
    if (!doctor.schedule || doctor.schedule.length === 0) {
      return res.status(400).json({ error: 'Doctor does not have a schedule' });
    }

    // Step 4: Assuming we want to find available slots for the current day
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

    // Find the doctor's schedule for today
    const todaySchedule = doctor.schedule.find(
      (schedule) => schedule.date === currentDate
    );

    // Step 5: If no schedule for today, return an error
    if (!todaySchedule) {
      return res.status(404).json({ error: 'No schedule available for today' });
    }

    // Step 6: Extract available slots from today's schedule
    const availableSlots = todaySchedule.slots;

    // Step 7: Fetch all appointments for today to check availability
    const appointmentsForToday = await Appointment.find({
      doctorId: doctorId,
      date: currentDate,
      status: 'pending', // Only check pending appointments for today
    });

    // Step 8: Filter out slots that are already booked (appointments for the same date)
    const bookedSlots = appointmentsForToday.map((appointment) => appointment.time);
    const availableSlotsForToday = availableSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    // Step 9: Return available slots as a response
    res.status(200).json({ availableSlots: availableSlotsForToday });
  } catch (error) {
    console.error('Error in finding available slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.rescheduleAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { date, time, status: 'Rescheduled' },
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};
exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  Appointment.findByIdAndDelete(appointmentId)
    .then(() => res.status(200).json({ message: 'Appointment deleted successfully' }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

