const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Get all schedules
router.get('/', scheduleController.getAllSchedules);

// Get a single schedule by ID
router.get('/:id', scheduleController.getScheduleById);

// Create a new schedule
router.post('/', scheduleController.createSchedule);

// Update a schedule
router.put('/:id', scheduleController.updateSchedule);

// Delete a schedule
router.delete('/:id', scheduleController.deleteSchedule);

// Add a stop to a schedule
router.post('/:id/stops', scheduleController.addStop);

// Delete a stop from a schedule
router.delete('/:scheduleId/stops/:stopId', scheduleController.deleteStop);

module.exports = router;
