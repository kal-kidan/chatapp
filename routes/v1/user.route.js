const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/:email')
  .get(validate(userValidation.getUserByEmail), userController.searchUser);

module.exports = router;
