const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.post('/:id/add', authController.protect, friendController.addFriend);

module.exports = router;
