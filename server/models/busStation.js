const mongoose = require('mongoose');

const busStationSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const BusStation = mongoose.model('BusStation', busStationSchema);

module.exports = BusStation;