const userRepository = require('../repositories/userRepository');

const getUsers = async () => {
  return await userRepository.getAllUsers();
};

const createUser = async (_id, username, email) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('El email ya está en uso');
  }
  return await userRepository.createUser({ _id, username, email });
};

const updateUser = async (_id, username, email) => {
  const user = await userRepository.updateUserById(_id, { username, email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

const showUser = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

const deleteUser = async (id) => {
  const user = await userRepository.deleteUserById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  showUser,
  deleteUser,
};
