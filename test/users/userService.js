// userService.js
const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

// Definición del servicio de usuario
const userService = {
  // Crear un nuevo usuario
  createUser: (data, endpoint = 'users/create') =>
    axios.post(`${BASE_URL}/${endpoint}`, data),

  // Obtener todos los usuarios
  getUsers: (endpoint = 'users') =>
    axios.get(`${BASE_URL}/${endpoint}`),

  // Actualizar un usuario existente
  updateUser: (id, data, endpoint = 'users/update') =>
    axios.put(`${BASE_URL}/${endpoint}/${id}`, data),

  // Obtener un usuario por ID
  getUser: (id, endpoint = 'users/show') =>
    axios.get(`${BASE_URL}/${endpoint}/${id}`),

  // Eliminar un usuario
  deleteUser: (id, endpoint = 'users/delete') =>
    axios.delete(`${BASE_URL}/${endpoint}/${id}`),
};

// Exportar el servicio
module.exports = userService;
