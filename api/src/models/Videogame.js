const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    released: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      }
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
  });
};
