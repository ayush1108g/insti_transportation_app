const Booking = require('../models/bookings');
const Schedule = require('../models/busSchedule');
const User = require('../models/user');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBooking = async (req, res) => {
  const { userId, scheduleId, cost } = req.body;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const updatedTotalBookings = schedule.totalBookings + 1;
    if (updatedTotalBookings > 60) {
      return res.status(400).json({ message: 'Bus is full' });
    }

    schedule.totalBookings = updatedTotalBookings;
    await schedule.save();

    const booking = new Booking({
      userId,
      scheduleId,
      cost
    });

    await booking.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.previousRides.push(booking._id);
    await user.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const user = await User.findById(booking.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.previousRides.pull(booking._id);
    await user.save();

    await booking.deleteOne(); 

    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};