// prettier-ignore
const { sendMsg, editMsg, deleteMsg, getMsgsWithFriend } = require('../controllers/privateMsgController');
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/send', authController.protect, sendMsg);
router.get('/friends/:id/msgs', authController.protect, getMsgsWithFriend);
router
   .route('/:id')
   .patch(authController.protect, editMsg)
   .delete(authController.protect, deleteMsg);

module.exports = router;
