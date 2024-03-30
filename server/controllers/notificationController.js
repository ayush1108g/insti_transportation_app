const Notification = require('../models/notifications');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllNotifications = catchAsync(async (req, res) => {
  
    const notifications = await Notification.find();
    res.json(notifications);
  } );

exports.getNotificationById = catchAsync( async (req, res) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return next(new AppError('Notification not Found', 404));
    }
    res.json(notification);
  } );

exports.createNotification = catchAsync( async (req, res) => {
  const { title, message, recipients } = req.body;

  
    const newNotification = new Notification({
      title,
      message,
      recipients
    });
    
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } );

exports.updateNotification = catchAsync(async (req, res) => {
  
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return next(new AppError('Notification not Found', 404));
    }

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

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } );

exports.deleteNotification = catchAsync(async (req, res) => {

    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return next(new AppError('Notification not Found', 404));
    }
    await notification.deleteOne({ _id: req.params.id }); 
    res.json({ message: 'Notification deleted' });
  } );
