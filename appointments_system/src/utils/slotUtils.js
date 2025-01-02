const checkAvailableSlots = (schedule, date, time) => {
    const daySchedule = schedule.find((day) => day.date === date);
    if (!daySchedule) return false; // No schedule for this date
  
    return daySchedule.slots.includes(time); // Check if the slot is available
  };
  
  const bookSlot = (schedule, date, time) => {
    const dayIndex = schedule.findIndex((day) => day.date === date);
  
    if (dayIndex === -1) return false; // No schedule for this date
  
    const slotIndex = schedule[dayIndex].slots.indexOf(time);
    if (slotIndex === -1) return false; // Slot not available
  
    schedule[dayIndex].slots.splice(slotIndex, 1); // Remove the booked slot
    return true;
  };
  
  module.exports = { checkAvailableSlots, bookSlot };
  