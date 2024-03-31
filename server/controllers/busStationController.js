const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const appError = require('../utils/appError');

const BusStation = require('../models/busStation');

exports.getAllBusStations = catchAsync(async (req, res, next) => {
  const busStations = await BusStation.find();
  res.json(busStations);
});

exports.getBusStationById = catchAsync(async (req, res, next) => {
  const busStation = await BusStation.findById(req.params.id);
  if (!busStation) {
    return next(new appError('Bus Station not found', 404));
  }
  res.json(busStation);
});

exports.createBusStation = catchAsync(async (req, res, next) => {
  const { stationName } = req.body;

  const newBusStation = new BusStation({
    stationName,
  });

  const savedBusStation = await newBusStation.save();
  res.status(201).json(savedBusStation);
});

exports.updateBusStation = catchAsync(async (req, res, next) => {
    const busStation = await BusStation.findById(req.params.id);
    if (!busStation) {
        return next(new appError('Bus Station Not found', 404));
    }
    
    if (req.body.stationName) {
        busStation.stationName = req.body.stationName;
    }
    
    const updatedBusStation = await busStation.save();
    res.json(updatedBusStation);
    });

exports.deleteBusStation = catchAsync(async (req, res, next) => { 
    const busStation = await BusStation.findById(req.params.id);
    if (!busStation) {
        return next(new appError('Bus Station Not found', 404));
    }
    
    await busStation.deleteOne();
    res.json({ message: 'Bus Station deleted successfully' });
    });