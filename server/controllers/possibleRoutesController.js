const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

const BusStation = require("../models/busStation");
const Schedule = require("../models/busSchedule");

exports.getPossibleRoutes = catchAsync(async (req, res, next) => {
  const possibleRoutes = [];
  const { startLocationId, endLocationId } = req.query;

  const schedules = await Schedule.find()
    .populate("startLocation")
    .populate("endLocation");

  for (const schedule of schedules) {
    const { startLocation, endLocation, busStops } = schedule;

    const startLocationIndex = busStops.findIndex(
      (stop) => String(stop.stopId) === String(startLocationId)
    );
    const endLocationIndex = busStops.findIndex(
      (stop) => String(stop.stopId) === String(endLocationId)
    );

    if (startLocationIndex !== -1 && endLocationIndex !== -1) {
      if (
        busStops[startLocationIndex].stopNumber <
        busStops[endLocationIndex].stopNumber
      ) {
        possibleRoutes.push(schedule);
      }
    }
  }

  res.json(possibleRoutes);
});
