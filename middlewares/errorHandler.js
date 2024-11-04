const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.message || 'Un error ocurrió'); // Registrar el error
  res.status(500).send('Algo salió mal!', err.message);
};
