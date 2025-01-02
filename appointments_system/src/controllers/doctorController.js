const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};


exports.addDoctor = async (req, res) => {
  const { name, specialty, schedule } = req.body;

  if (!name || !specialty || !schedule) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const doctor = new Doctor({
      name,
      specialty,
      schedule,
    });

    const newDoctor = await doctor.save();
    res.status(201).json({
      message: 'Doctor created successfully',
      newDoctor,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to create doctor: ${error.message}` });
  }
};
