const isMissedAppointment = (appointmentTime, gracePeriod = 15) => {
    const now = new Date();
    const appointmentDateTime = new Date(appointmentTime);
  
    return now - appointmentDateTime > gracePeriod * 60 * 1000; // Compare with grace period in ms
  };
  
  module.exports = { isMissedAppointment };
  