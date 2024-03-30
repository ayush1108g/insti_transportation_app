const Schedule = require('../models/busSchedule');

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  const { routeName, startTime, startLocation, endTime, endLocation, busStops } = req.body;

  try {
    const newSchedule = new Schedule({
      routeName,
      startTime,
      startLocation,
      endTime,
      endLocation,
      busStops
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    if (req.body.routeName) {
      schedule.routeName = req.body.routeName;
    }
    if (req.body.startTime) {
      schedule.startTime = req.body.startTime;
    }
    if (req.body.startLocation) {
      schedule.startLocation = req.body.startLocation;
    }
    if (req.body.endTime) {
      schedule.endTime = req.body.endTime;
    }
    if (req.body.endLocation) {
      schedule.endLocation = req.body.endLocation;
    }
    if (req.body.busStops) {
      schedule.busStops = req.body.busStops;
    }

    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    await schedule.remove();
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStop = async (req, res) => {
  const { stopName, arrivalTime, cost } = req.body;
  const scheduleId = req.params.id;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const newStop = {
      stopName,
      arrivalTime,
      cost
    };

    schedule.busStops.push(newStop);
    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStop = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const stopId = req.params.stopId;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const stopIndex = schedule.busStops.findIndex(stop => stop._id == stopId);
    if (stopIndex === -1) {
      return res.status(404).json({ message: 'Stop not found in the schedule' });
    }

    schedule.busStops.splice(stopIndex, 1);
    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
