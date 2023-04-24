const Repair = require('./repair.model');
const User = require('./user.model');

const initModels = () => {
  //al ser userId no hace falta poner { foreignKey: 'userId' }
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModels;
