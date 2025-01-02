const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: String, required: true }, // Email or phone number
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Sent'
});

module.exports = mongoose.model('Notification', notificationSchema);
