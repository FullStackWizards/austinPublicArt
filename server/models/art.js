var db = require('../db');


exports.get = () => {
  return db.art.find();
};
