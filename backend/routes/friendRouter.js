const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.post(
   '/add/:userId',
   authController.protect,
   friendController.addUserAsFriend
);

router
   .route('/:id')
   .delete(authController.protect, friendController.deleteFriend);

router.get(
   '/search-people',
   authController.protect,
   friendController.searchPeople
);

module.exports = router;
