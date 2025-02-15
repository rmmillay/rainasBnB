'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 1,
        address: "123 spongebob way",
        city: "bikini bottom",
        state: "hawaii",
        country: "usa",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Pineapple",
        description: "pineapple under the sea",
        price: 55.00
      },
      {
        ownerId: 1,
        address: "555 vscode st",
        city: "bikini top",
        state: "alaska",
        country: "usa",
        lat: 40.8977,
        lng: -87.0365,
        name: "code editor",
        description: "Best place to code",
        price: 90.00
      },
      {
        ownerId: 2,
        address: "group 3 apt 1",
        city: "New York City",
        state: "New York",
        country: "usa",
        lat: 34.8977,
        lng: -65.0365,
        name: "A cool group",
        description: "A place where people have fun",
        price: 69.00
      }, {
        ownerId: 3,
        address: "group 1 apt 3",
        city: "Buffalo",
        state: "New York",
        country: "usa",
        lat: 58.8977,
        lng: -59.0365,
        name: "A cold group",
        description: "Come here if you want to enjoy snow",
        price: 56.00
      }, {
        ownerId: 3,
        address: "group 8 apt 5",
        city: "Concrete Jungle",
        state: "New York",
        country: "usa",
        lat: 35.8974,
        lng: -69.0365,
        name: "Santa's hood",
        description: "Heaven is a place on Earth",
        price: 40.00
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
