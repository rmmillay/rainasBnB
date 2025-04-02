'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Leroy',
        lastName: 'Jenkins',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'patrick',
        lastName: 'star',
        email: 'star@user.io',
        username: 'pstar',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'spongebob',
        lastName: 'squarepants',
        email: 'spongebob@user.io',
        username: 'spongebob123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'john',
        lastName: 'doe',
        email: 'spongeboby@user.io',
        username: 'spongebob13',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'jane',
        lastName: 'doe',
        email: 'cheddathagettab@user.io',
        username: 'cheddsman123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'guap',
        lastName: 'lord',
        email: 'yomanguap@user.io',
        username: 'guaps123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'chedds',
        lastName: 'guapp',
        email: 'guap2@user.io',
        username: 'guap2lord123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'james',
        lastName: 'smith',
        email: 'guap3@user.io',
        username: 'guap3lord123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'mary',
        lastName: 'land',
        email: 'guap4@user.io',
        username: 'guap4lord123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'cali',
        lastName: 'fornia',
        email: 'guap5@user.io',
        username: 'guap5lord123',
        hashedPassword: bcrypt.hashSync('password')
      },


    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
