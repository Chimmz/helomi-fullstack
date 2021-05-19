const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router
   .route('/:id')
   .get(authController.protect, userController.getUserPublicProfile);
router.patch(
   '/update-my-profile',
   authController.protect,
   userController.updateMe
);

module.exports = router;
