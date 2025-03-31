'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 7,
        spotId: 1,
        review: 'roll up, drop that, skirt that, pop that!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: 'u never loved me mom...',
        stars: 4,
      }, 
      {
        userId: 3,
        spotId: 2,
        review: 'but i needed u, whoaaa',
        stars: 3,
      }, 
      {
        userId: 4,
        spotId: 3,
        review: 'oh ah cling cling cling cling cling',
        stars: 2,
      }, 
      {
        userId: 5,
        spotId: 4,
        review: 'man you cappin!',
        stars: 5,
      }, 
      {
        userId: 6,
        spotId: 4,
        review: 'drip splash water drip splash splash drip water splash splash drip water',
        stars: 1,
      },
      {
        userId: 7,
        spotId: 5,
        review: 'I dont like the bronks at all',
        stars: 1,
      },
      {
        userId: 8,
        spotId: 6,
        review: 'im like sheesh!',
        stars: 1,
      },
      {
        userId: 9,
        spotId: 7,
        review: 'but what about the yeet?',
        stars: 1,
      },
      {
        userId: 10,
        spotId: 8,
        review: 'thats da woopdi',
        stars: 1,
      },
      
      //{
      //   userId: 6,
      //   spotId: 9,
      //   review: 'i like the car rats rappin in the comercial',
      //   stars: 1,
      // },
      // {
      //   userId: 1,
      //   spotId: 10,
      //   review: 'splash splash drip water splash splash drip waterr',
      //   stars: 1,
      // },


    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
