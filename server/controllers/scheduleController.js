const Schedule = require("../models/busSchedule");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllSchedules = catchAsync(async (req, res, next) => {
  const schedules = await Schedule.find()
    .populate("startLocation")
    .populate("endLocation")
    .populate("busStops.stopId");
  res.status(200).json(schedules);
});

exports.getScheduleById = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id)
    .populate("startLocation")
    .populate("endLocation")
    .populate("busStops.stopId");
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }
  res.status(200).json(schedule);
});

exports.createSchedule = catchAsync(async (req, res, next) => {
  const {
    routeName,
    startTime,
    startLocation,
    endTime,
    endLocation,
    busStops,
    capacity,
    cost,
  } = req.body;

  const newSchedule = new Schedule({
    routeName,
    startTime,
    startLocation,
    endTime,
    endLocation,
    busStops,
    capacity,
    cost,
  });

  const savedSchedule = await newSchedule.save();
  res.status(201).json(savedSchedule);
});

exports.updateSchedule = catchAsync(async (req, res, next) => {
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
  if (req.body.capacity) {
    schedule.capacity = req.body.capacity;
  }

  const updatedSchedule = await schedule.save();
  res.status(200).json(updatedSchedule);
});

exports.deleteSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }
  await schedule.deleteOne();
  res.json({ message: "Schedule deleted" });
});

exports.addStop = catchAsync(async (req, res, next) => {
  const { stopId, arrivalTime, cost, stopNumber } = req.body;
  const scheduleId = req.params.id;

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }

  schedule.busStops.forEach((stop) => {
    if (stop.stopNumber >= stopNumber) {
      stop.stopNumber += 1;
    }
  });

  const newStop = {
    stopId,
    arrivalTime,
    cost,
    stopNumber,
  };

  schedule.busStops.push(newStop);
  const updatedSchedule = await schedule.save();
  res.json(updatedSchedule);
});

exports.deleteStop = catchAsync(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const stopId = req.params.stopId;
  const { stopNumber } = req.body;

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    return next(new AppError("Schedule Not found", 404));
  }

  schedule.busStops.forEach((stop) => {
    if (stop.stopNumber >= stopNumber) {
      stop.stopNumber -= 1;
    }
  });

  const stopIndex = schedule.busStops.findIndex((stop) => stop._id == stopId);
  if (stopIndex === -1) {
    return next(new AppError("Bus Stop Not found", 404));
  }

  schedule.busStops.splice(stopIndex, 1);
  const updatedSchedule = await schedule.save();
  res.status(200).json(updatedSchedule);
});

exports.updateBusStop = async (req, res, next) => {
  try {
    const scheduleId = req.params.scheduleId, stopId = req.params.stopId;
    const { updatedBusStop } = req.body;

    console.log('scheduleId:', scheduleId, 'stopId:', stopId, 'updatedBusStop:', updatedBusStop);

    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const busStopIndex = schedule.busStops.find(stop => stop.stopId === stopId);

    if (busStopIndex === -1) {
      return res.status(404).json({ message: 'Bus stop not found' });
    }

    schedule.busStops[busStopIndex] = { ...schedule.busStops[busStopIndex], ...updatedBusStop };

    const updatedRoute = await schedule.save();

    return res.status(200).json(updatedRoute);
  } catch (error) {
    console.error('Error updating bus stop:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


