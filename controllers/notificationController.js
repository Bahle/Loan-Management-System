// controllers/notificationController.js

const { getNotifications, getNotificationById, createNotification } = require('../models/notification');

// Controller function to get all notifications with pagination
exports.getAllNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const notifications = await getNotifications(page, pageSize);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch notifications' });
  }
};

// Controller function to get a specific notification by ID
exports.getNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await getNotificationById(notificationId);
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch notification' });
  }
};

// Controller function to create a new notification
exports.createNotification = async (req, res) => {
  try {
    const newNotification = {
      loan: req.body.loan,
      message: req.body.message,
      // Add other fields as needed based on your notification schema
    };
    const notificationId = await createNotification(newNotification);
    res.status(201).json({ message: 'Notification created successfully', notificationId });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create notification' });
  }
};
