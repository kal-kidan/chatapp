const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const searchUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);
  res.send({ id: user.id, email: user.email, name: user.name });
});

module.exports = {
  createUser,
  getUser,
  searchUser,
};
