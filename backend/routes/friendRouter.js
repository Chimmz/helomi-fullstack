const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.post('/add', authController.protect, friendController.addFriend);
router
   .route('/:id')
   .delete(authController.protect, friendController.deleteFriend);

module.exports = router;
