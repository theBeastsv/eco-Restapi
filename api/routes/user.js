const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');

//Get a list of all User
router.get('/', UserController.getalluser);
//Create a new User
router.post('/', UserController.signup);
//User login
router.post('/', UserController.login);

module.exports = router;