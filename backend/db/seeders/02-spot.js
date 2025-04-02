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
        ownerId: 1,
        address: "123 clingclingcling way",
        city: "bikini bottom",
        state: "hawaii",
        country: "usa",
        lat: 37.76453,
        lng: -122.47303,
        name: "water voyage",
        description: "drip water splash",
        price: 55.00,
        avgRating: 3,
        previewImage: "https://dongardner.com/cdn/shop/articles/706-front-1.jpg?v=1713538108",
      },
      {
        ownerId: 1,
        address: "679 manyoucappin rd apt 1",
        city: "New York City", 
        state: "New York",
        country: "usa",
        lat: 31.76463,
        lng: -128.77303,
        name: "hood of cheedar",
        description: "enjoy tha cheddar",
        price: 69.00,
        avgRating: 5,
        previewImage: "https://webberstudio.com/wp-content/uploads/2023/02/Stunning-House-Design.jpg",
      }, 
      {
        ownerId: 2,
        address: "555 yeetskrrt st",
        city: "bikini top",
        state: "alaska",
        country: "usa",
        lat: 35.76463,
        lng: -120.77303,
        name: "guaplord's yeet kingdom",
        description: "its tha woopdi",
        price: 90.00,
        avgRating: 5,
        previewImage: "https://m.media-amazon.com/images/I/71S0tj6GF9L.jpg",
      },
      {
        ownerId: 2,
        address: "9874 views dr",
        city: "Buffalo",
        state: "New York",
        country: "usa",
        lat: 36.76463,
        lng: -122.77313,
        name: "car rats",
        description: "my man guap gotta lay low in turkey for a min",
        price: 56.00,
        avgRating: 4,
        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcTC03MSLWhctdf9clwrwcWaMhd7SwBjcsRA&s",

      }, 
      {
        ownerId: 3,
        address: "455 capism ln",
        city: "Concrete Jungle",
        state: "New York",
        country: "usa",
        lat: 359.22463,
        lng: -129.33303,
        name: "1trillionviews",
        description: "so many views",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://static.schumacherhomes.com/umbraco/media/wvflutbh/image4.jpg?format=webp",
      },
      {
        ownerId: 4,
        address: "455 tiktok way",
        city: "tazz",
        state: "New York",
        country: "usa",
        lat: 38.22463,
        lng: -124.33303,
        name: "tha jingle",
        description: "nationwide is on ur side",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg",
      },
      {
        ownerId: 5,
        address: "455 cali dr",
        city: "Concrete Jungle",
        state: "New York",
        country: "usa",
        lat: 34.22963,
        lng: -121.63303,
        name: "in the mountains",
        description: "naw im just chillin",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://town-n-country-living.com/wp-content/uploads/2023/06/craftsman-exterior.jpg",
      },
      {
        ownerId: 6,
        address: "455 popthat dr",
        city: "maine",
        state: "New York",
        country: "usa",
        lat: 33.22466,
        lng: -120.34303,
        name: "its the best place",
        description: "its great",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://www.tennessean.com/gcdn/presto/2019/10/11/PNAS/adf1101a-0f8c-404f-9df3-5837bf387dfd-1_Exterior_House_Beautiful_Whole_Home_Concept_House_Castle_Homes_Photo_Reed_Brown_Photography.jpg?crop=5619,3161,x0,y104&width=3200&height=1801&format=pjpg&auto=webp",
      },
      {
        ownerId: 6,
        address: "455 dropthat dr",
        city: "fornia",
        state: "cali",
        country: "usa",
        lat: 30.299963,
        lng: -121.66603,
        name: "my song yeet",
        description: "3 billion views in 2 days",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://static01.nyt.com/images/2024/10/20/multimedia/15location-northhaven-wjlf/15location-northhaven-wjlf-videoSixteenByNineJumbo1600.jpg",
      },
      {
        ownerId: 7,
        address: "455 pullup dr",
        city: "new song",
        state: "Yorkshire",
        country: "usa",
        lat: 30.26663,
        lng: -128.77703,
        name: "the very best",
        description: "tis a beut",
        price: 40.00,
        avgRating: 2,
        previewImage: "https://onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg",
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
