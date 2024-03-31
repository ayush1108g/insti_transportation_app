const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');


router.get('/', scheduleController.getAllSchedules);


router.get('/:id', scheduleController.getScheduleById);


router.post('/', scheduleController.createSchedule);


router.put('/:id', scheduleController.updateSchedule);


router.delete('/:id', scheduleController.deleteSchedule);


router.post('/:id/stops', scheduleController.addStop);


router.put('/:scheduleId/stops/:stopId', scheduleController.updateBusStop);


router.delete('/:scheduleId/stops/:stopId', scheduleController.deleteStop);

module.exports = router;
