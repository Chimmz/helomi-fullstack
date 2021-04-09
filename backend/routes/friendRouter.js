const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const { route } = require('./userRouter');

const router = express.Router();

router.post('/add', authController.protect, friendController.addFriend);

router
   .route('/:id')
   .delete(authController.protect, friendController.deleteFriend);

module.exports = router;
