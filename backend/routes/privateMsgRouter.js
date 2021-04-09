// prettier-ignore
const { sendMsg, editMsg, deleteMsg } = require('../controllers/privateMsgController');
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/send', authController.protect, sendMsg);
router
   .route('/:id')
   .patch(authController.protect, editMsg)
   .delete(authController.protect, deleteMsg);

module.exports = router;
