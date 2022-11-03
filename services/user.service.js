const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken.');
  }
  const user = await User.create(userBody);
  return user;
};

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  return user;
};

const searchUser = async (keyword) => {
  const users = await User.find({
    $or: [{ email: keyword }, { name: { $regex: `.*${keyword}.*` } }],
  });
  return users.map((user) => ({ user }));
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  searchUser,
};
