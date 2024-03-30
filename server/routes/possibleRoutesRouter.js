const express = require('express');
const router = express.Router();
const possibleRoutesController = require('../controllers/possibleRoutesController');

router.get('/', possibleRoutesController.getPossibleRoutes);

module.exports = router;
