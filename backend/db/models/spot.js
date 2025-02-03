'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Spot.init(
    {
    ownerId: { 
     type: DataTypes.INTEGER, 
     allowNull: false,
     unique: true,
     validate: {
      },
    },
  
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
     len: [3, 256]
    },
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  }, 

  lat: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    unique: true,
    validate: {
     len: [3, 256]
    },
  },

  lng: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    unique: true,
    validate: {
     len: [3, 256]
    },
  },

    name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

  description: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    len: [60, 60]
  },
 },

 price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

  createdAt: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

  updatedAt: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
     len: [3, 256]
    },
  },

},

  {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
  }
);
  return Spot;
};