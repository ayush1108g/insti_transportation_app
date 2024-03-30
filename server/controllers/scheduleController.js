const Schedule = require("../models/busSchedule");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllSchedules = catchAsync(async (req, res) => {
  const schedules = await Schedule.find();
  res.json(schedules);
});

exports.getScheduleById = catchAsync(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }
  res.json(schedule);
});

exports.createSchedule = catchAsync(async (req, res) => {
  const { routeName, startTime, startLocation, endTime, endLocation, busStops, capacity, cost } = req.body;

  const startAndEndStops = [
    {
      stopId: startLocation, 
      stopNumber: 0,
      arrivalTime: startTime,
      cost: 0
    },
    {
      stopId: endLocation,
      stopNumber: 100,
      arrivalTime: endTime,
      cost: cost
    }
  ];
  busStops.push(...startAndEndStops);

    const newSchedule = new Schedule({
      routeName,
      startTime,
      startLocation,
      endTime,
      endLocation,
      busStops,
      capacity,
      cost
    });

  const savedSchedule = await newSchedule.save();
  res.status(201).json(savedSchedule);
});

exports.updateSchedule = catchAsync(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
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
    if(req.body.capacity){
      schedule.capacity = req.body.capacity;
    }

  const updatedSchedule = await schedule.save();
  res.json(updatedSchedule);
});

exports.deleteSchedule = catchAsync( async (req, res) => {
  
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return next(new AppError('Schedule Not found', 404));
    }
    await schedule.deleteOne();
    res.json({ message: 'Schedule deleted' });
  } );

exports.addStop = catchAsync( async (req, res) => {
  const { stopId, arrivalTime, cost, stopNumber } = req.body;
  const scheduleId = req.params.id;

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }

  schedule.busStops.forEach(stop => {
    if (stop.stopNumber >= stopNumber) {
      stop.stopNumber += 1;
    }
  });

    const newStop = {
      stopId,
      arrivalTime,
      cost,
      stopNumber
    };

    schedule.busStops.push(newStop);
    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
} );

exports.deleteStop = catchAsync(async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const stopId = req.params.stopId;

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }

    schedule.busStops.forEach(stop => {
    if (stop.stopNumber >= stopNumber) {
      stop.stopNumber -= 1;
    }
  });

    const stopIndex = schedule.busStops.findIndex(stop => stop._id == stopId);
    if (stopIndex === -1) {
      return next(new AppError('Bus Stop Not found', 404));
    }

  schedule.busStops.splice(stopIndex, 1);
  const updatedSchedule = await schedule.save();
  res.json(updatedSchedule);
});
