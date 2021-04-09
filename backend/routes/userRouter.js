const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.get('/auth', authController.protect);

router.patch(
   '/update-my-profile',
   authController.protect,
   userController.updateMe
);

module.exports = router;
