const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { _id, username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username y email son requeridos' });
  }

  try {
    const user = await userService.createUser(_id, username, email);
    res.status(201).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(error.message === 'El email ya está en uso' ? 409 : 500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await userService.updateUser(id, username, email);
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(error.message === 'Usuario no encontrado' ? 404 : 500).json({ message: error.message });
  }
};

exports.showUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await userService.showUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.message === 'Usuario no encontrado' ? 404 : 500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(error.message === 'Usuario no encontrado' ? 404 : 500).json({ message: error.message });
  }
};
