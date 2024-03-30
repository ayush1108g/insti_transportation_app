const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  startLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusStation',
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  endLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusStation',
    required: true
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  cost: {
    type: Number,
    required: true
  },
  busStops: [{
    stopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BusStation',
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    cost: {
        type: Number,
    },
    stopNumber: {
        type: Number,
        required: true
    }
  }],
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
