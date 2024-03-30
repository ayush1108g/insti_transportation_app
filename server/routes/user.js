const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);


router.get('/:id', userController.getUserById);


router.post('/', userController.createUser);


router.put('/:id', userController.updateUser);


router.get('/:id/previousRides', userController.getPreviousRides);


router.delete('/:id', userController.deleteUser);

module.exports = router;
