const Notification = require('../models/Notification');

exports.sendNotification = async (req, res, next) => {
  try {
    const { recipient, message } = req.body;
    const notification = new Notification({ recipient, message });
    await notification.save();
    res.status(201).json({ message: 'Notification sent successfully.' });
  } catch (error) {
    next(error);
  }
};
