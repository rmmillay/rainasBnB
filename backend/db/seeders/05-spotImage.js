'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://dongardner.com/cdn/shop/articles/706-front-1.jpg?v=1713538108",
        preview: true
      },
      {
        spotId: 2,
        url: "https://webberstudio.com/wp-content/uploads/2023/02/Stunning-House-Design.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://m.media-amazon.com/images/I/71S0tj6GF9L.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcTC03MSLWhctdf9clwrwcWaMhd7SwBjcsRA&s",
        preview: true
      },
      {
        spotId: 5,
        url: "https://hips.hearstapps.com/hmg-prod/images/dutch-colonial-house-style-66956ed4ce458.jpg?crop=1.00xw:0.667xh;0,0.128xh&resize=980:*",
        preview: true
      },
      {
        spotId: 6,
        url: "https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://town-n-country-living.com/wp-content/uploads/2023/06/craftsman-exterior.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://www.tennessean.com/gcdn/presto/2019/10/11/PNAS/adf1101a-0f8c-404f-9df3-5837bf387dfd-1_Exterior_House_Beautiful_Whole_Home_Concept_House_Castle_Homes_Photo_Reed_Brown_Photography.jpg?crop=5619,3161,x0,y104&width=3200&height=1801&format=pjpg&auto=webp",
        preview: true
      },
      {
        spotId: 9,
        url: "https://static01.nyt.com/images/2024/10/20/multimedia/15location-northhaven-wjlf/15location-northhaven-wjlf-videoSixteenByNineJumbo1600.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg",
        preview: true
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
