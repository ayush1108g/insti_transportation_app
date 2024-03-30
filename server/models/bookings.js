const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  // seatNumber: {
  //   type: Number,
  //   required: true
  // },
  // isConfirmed: {
  //   type: Boolean,
  //   default: false
  // },
  cost: {
    type: Number,
    required: true
  },
  // Additional fields like payment details, booking status, etc.
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
