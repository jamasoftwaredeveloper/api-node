const User = require('../models/User');

const getAllUsers = async () => {
  return await User.find().select('username email');
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  createUser,
  updateUserById,
  findUserById,
  deleteUserById,
};
