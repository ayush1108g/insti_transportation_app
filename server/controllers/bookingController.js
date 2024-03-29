const Booking = require('../models/bookings');
const Schedule = require('../models/busSchedule');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single booking by ID
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

// Create a new booking
exports.createBooking = async (req, res) => {
  const { userId, scheduleId, seatNumber, cost } = req.body;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if seat is available
    const bookedSeats = await Booking.find({ scheduleId: scheduleId });
    if (bookedSeats.length >= schedule.capacity) {
      return res.status(400).json({ message: 'No available seats for this schedule' });
    }

    const booking = new Booking({
      userId,
      scheduleId,
      seatNumber,
      cost
      // Add additional fields as needed
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update only the fields that are sent in the request body
    if (req.body.userId) {
      booking.userId = req.body.userId;
    }
    if (req.body.scheduleId) {
      booking.scheduleId = req.body.scheduleId;
    }
    if (req.body.seatNumber) {
      booking.seatNumber = req.body.seatNumber;
    }
    if (req.body.cost) {
      booking.cost = req.body.cost;
    }
    // Update additional fields as needed

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.remove();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
