const express = require('express');
const { getUsers, createUser, updateUser, showUser, deleteUser } = require('../controllers/userController');
const router = express.Router();
const { validateUser } = require('../middlewares/validateUser');
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', validateUser.listUsers, getUsers);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/create', validateUser.createAndUpdate, createUser);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Solicitud incorrecta
 */
router.put('/update/:id', validateUser.createAndUpdate, updateUser);

/**
 * @swagger
 * /users/show/{id}:
 *   get:
 *     summary: Ver un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a ver
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ver un usuario exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/show/:id', showUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/delete/:id', deleteUser);

module.exports = router;
