const Booking = require('../models/bookings');
const Schedule = require('../models/busSchedule');
const User = require('../models/user');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllBookings = catchAsync( async (req, res) => {
  
    const bookings = await Booking.find();
    res.json(bookings);
  });

exports.getBookingById = catchAsync(async (req, res) => {
  
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }
    res.json(booking);
  } );

exports.createBooking = catchAsync(async (req, res) => {
  const { userId, scheduleId, cost, paymentMethod } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return next(new AppError('Schedule Not found', 404));
    }

    const updatedTotalBookings = schedule.totalBookings + 1;
    if (updatedTotalBookings > schedule.capacity) {
      return next(new AppError('Bus is Full', 400));
    }

    schedule.totalBookings = updatedTotalBookings;
    await schedule.save();

    const booking = new Booking({
      userId,
      scheduleId,
      cost,
      paymentMethod
    });

    await booking.save();

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('User not Found', 404));
    }

    user.previousRides.push(booking._id);
    
    if (paymentMethod === 'payLater') {
      user.payLater += cost;
    }

    await user.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } );


exports.updateBooking = catchAsync(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    if (req.body.userId) {
      booking.userId = req.body.userId;
    }
    if (req.body.scheduleId) {
      booking.scheduleId = req.body.scheduleId;
    }
    if (req.body.cost) {
      booking.cost = req.body.cost;
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } );

exports.deleteBooking = catchAsync(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    const user = await User.findById(booking.userId);
    if (!user) {
      return next(new AppError('User not Found', 404));
    }

    user.previousRides.pull(booking._id);
    await user.save();

    await booking.deleteOne(); 

    res.json({ message: 'Booking deleted' });
  } );