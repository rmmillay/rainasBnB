'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId', as: 'Owner'
      });

      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      });

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      });

    }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
        },
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
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
        unique: false,
        // validate: {
        //   isDecimal: true,
        //   min: -90,
        //   max: 90,
        // },
      },

      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: false,
        // validate: {
        //   isDecimal: true,
        //   min: -180,
        //   max: 180,
        // },
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
          len: [5, 1000]
        }
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
    },

    {
      sequelize,
      modelName: 'Spot',
      defaultScope: {
        attributes: {
          // exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
  return Spot;
};
