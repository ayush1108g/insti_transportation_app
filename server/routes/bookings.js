const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get a single booking by ID
router.get('/:id', bookingController.getBookingById);

// Create a new booking
router.post('/', bookingController.createBooking);

// Update a booking
router.put('/:id', bookingController.updateBooking);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
