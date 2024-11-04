const { body, param, query, validationResult } = require('express-validator');

// Middleware de validación para las operaciones de usuario
exports.validateUser = {
  // Validación para crear y actualizar usuario
  create: [
    body('_id')
      .isNumeric()
      .withMessage('El id debe ser un número.')
      .isInt({ min: 1 }),
    body('username')
      .isString()
      .withMessage('El nombre de usuario debe ser una cadena.')
      .isLength({ min: 3 })
      .withMessage('El nombre de usuario debe tener al menos 3 caracteres.'),
    body('email')
      .isEmail()
      .withMessage('Debe proporcionar un correo electrónico válido.')
      .normalizeEmail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  update: [
    param('id'),
    body('username')
      .isString()
      .withMessage('El nombre de usuario debe ser una cadena.')
      .isLength({ min: 3 })
      .withMessage('El nombre de usuario debe tener al menos 3 caracteres.'),
    body('email')
      .isEmail()
      .withMessage('Debe proporcionar un correo electrónico válido.')
      .normalizeEmail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  // Validación para ver un usuario por ID
  findUser: [
    param('id')
      .isMongoId()
      .withMessage('El ID del usuario debe ser un ID de MongoDB válido.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  // Validación para listar usuarios (opcional)
  listUsers: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage(
        'El número de página debe ser un número entero mayor que 0.'
      ),
    query('limit')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El límite debe ser un número entero mayor que 0.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};
