const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications
router.get('/', notificationController.getAllNotifications);

// Get a single notification by ID
router.get('/:id', notificationController.getNotificationById);

// Create a new notification
router.post('/', notificationController.createNotification);

// Update a notification
router.put('/:id', notificationController.updateNotification);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
