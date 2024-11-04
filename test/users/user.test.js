const axios = require('axios');
const mongoose = require('mongoose');
// Definir la URL base
const BASE_URL = 'http://localhost:3000';
const USER_ID = 1;

describe('API de Usuarios', () => {
  beforeAll(async () => {
    // Crear un usuario antes de las pruebas
    const response = await axios.post(`${BASE_URL}/users/create`, {
      _id: USER_ID, // Usar un ID válido
      username: 'john_doe',
      email: 'john@example.com',
    });
    // Guardar el ID del usuario creado
  });

  test('Listar todos los usuarios', async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThanOrEqual(1); // Debería haber un usuario creado previamente
  }, 10000);

  test('Actualizar un usuario', async () => {
    const response = await axios.put(`${BASE_URL}/users/update/${USER_ID}`, {
      username: 'john_doe 1',
      email: 'john_new@example.com',
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      username: 'john_doe 1',
      email: 'john_new@example.com',
    });
  }, 10000);

  test('Ver un usuario', async () => {
    try {
      await axios.get(`${BASE_URL}/users/show/${USER_ID}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.log('delete ver', error);
    }
    //e;
  }, 10000);

  test('Eliminar un usuario', async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/users/delete/${USER_ID}`
      );
      expect(response.status).toBe(204);
    } catch (error) {
      console.log('error delete', error);
    }
    //
  }, 10000);
});
