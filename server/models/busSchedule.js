const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  startLocation: {
    type: String,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  busStops: [{
    stopName: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    cost: {
        type: Number,
    }
  }],
  // Additional fields like vehicle type, driver information, etc.
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
