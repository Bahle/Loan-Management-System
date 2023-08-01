// routes/notification.js

const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notificationController');

// GET route for getting all notifications with pagination
router.get('/', NotificationController.getAllNotifications);

// GET route for getting a specific notification by ID
router.get('/:id', NotificationController.getNotification);

// POST route for creating a new notification
router.post('/', NotificationController.createNotification);

module.exports = router;
