const express = require('express');
const router = express.Router();
const busStationController = require('../controllers/busStationController');

router.get('/', busStationController.getAllBusStations);
router.get('/:id', busStationController.getBusStationById);
router.post('/', busStationController.createBusStation);
router.put('/:id', busStationController.updateBusStation);
router.delete('/:id', busStationController.deleteBusStation);

module.exports = router;