// Controller imports
var index = require('./controllers/index');

module.exports = (app) => {
  // Decorate the express instance with the controller routers
  app.use('/api', index);
};
