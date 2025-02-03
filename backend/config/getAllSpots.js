const { Spot } = require('../db/models');

const getAllSpots = async () => {
  try {
    return await Spot.findAll();
  } catch (error) {
    console.error('error getting spots', error);
    throw new Error('unable to get spots');
  }
};

module.exports = { getAllSpots };