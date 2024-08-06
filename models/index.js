const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Car: require('./car')(sequelize, Sequelize.DataTypes),
  Rent: require('./rent')(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
