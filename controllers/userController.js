const User = require('../models/User'); // Asegúrate de tener tu modelo de usuario

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('username,email');
    res.json(users);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, email, _id } = req.body;

  // Validar que se proporcionen los campos requeridos
  if (!username || !email) {
    return res.status(400).json({ message: 'Username y email son requeridos' });
  }

  try {
    const user = await User.findOne({ _id, username, email });
    if (!user) {
      const newUser = new User({ _id, username, email });
      await newUser.save();
    }
    res.status(201).json({ username, email });
  } catch (error) {
    res.status(500).send('Error al crear usuario');
  }
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ username, email });
  } catch (error) {
    res.status(500).send('Error al actualizar usuario', error);
  }
};

// Ver un usuario por ID
exports.showUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error al obtener usuario');
  }
};

// Eliminar un usuario existente
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
    
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(204).send(); // No hay contenido que devolver
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' }); // Enviar mensaje de error
  }
};

