// Controller imports
// var art = require('./controllers/art');
var auth = require('./controllers/auth');

module.exports = (app) => {
  // Decorate the express instance with the controller routers
  app.use('/api', auth);
};
