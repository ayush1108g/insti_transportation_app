const Notification = require('../models/notifications');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  const { title, message, recipients } = req.body;

  try {
    const newNotification = new Notification({
      title,
      message,
      recipients
      // Add additional fields as needed
    });
    
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a notification
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update only the fields that are sent in the request body
    if (req.body.title) {
      notification.title = req.body.title;
    }
    if (req.body.message) {
      notification.message = req.body.message;
    }
    if (req.body.recipients) {
      notification.recipients = req.body.recipients;
    }
    if (req.body.isRead !== undefined) {
      notification.isRead = req.body.isRead;
    }
    // Update additional fields as needed

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.remove();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
