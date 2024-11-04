// Importaciones necesarias
const userService = require('./userService');
const USER_ID = Math.floor(Math.random() * 400) + 1;;

describe('API de Usuarios', () => {
  // Ejecutar antes de todas las pruebas
  beforeAll(async () => {
    // Crear un usuario antes de las pruebas
    await userService.createUser({
      _id: USER_ID,
      username: 'john_doe',
      email: 'john@example.com',
    });
  });

  test(
    'Listar todos los usuarios',
    async () => {
      const response = await userService.getUsers();
      expect(response.status).toBe(200);
      expect(response.data.length).toBeGreaterThanOrEqual(1); // Al menos un usuario debería estar creado
    },
    10000
  );

  test(
    'Actualizar un usuario',
    async () => {
      const response = await userService.updateUser(USER_ID, {
        username: 'john_doe 1',
        email: 'john_new@example.com',
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        username: 'john_doe 1',
        email: 'john_new@example.com',
      });
    },
    10000
  );

  test(
    'Ver un usuario',
    async () => {
      const response = await userService.getUser(USER_ID);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('username', 'john_doe 1');
      expect(response.data).toHaveProperty('email', 'john_new@example.com');
    },
    10000
  );

  test(
    'Eliminar un usuario',
    async () => {
      const response = await userService.deleteUser(USER_ID);
      expect(response.status).toBe(204); // No hay contenido después de eliminar
    },
    10000
  );
});
