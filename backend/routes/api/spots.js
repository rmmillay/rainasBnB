//Imports
const express = require('express')
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { Spot } = require('../../db/models');


//--Middleware to protect incoming Data for spot creation route-- 
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country.'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Please provide a valid latitude.'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Please provide a valid longitude.'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('Please provide a valid price.'),
  handleValidationErrors
];
  




// --Create New Spot--
router.post('/', requireAuth, validateSpot, async (req, res) => {
  try {
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const ownerId = req.user.id;

   const spot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
});
    
    return res.status(201).json(spot);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



// --Get All Spots--
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    return res.json(spots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// --Get Spot By Id--
router.get('/:id', async (req, res) => {
   try {
     const spot = await Spot.findByPk(req.params.id);
     if (!spot) {
        return res.status(404).json({ error: "Spot not found"});
     }
     return res.json(spot);
   } catch (error) {
     return res.status(500).json({ error: error.message });
  }
});



// --Get details for a Spot from an ID--
router.get('/:spotId', async (req, res, next) => {

  const spotId = parseInt(req.params.spotId);

  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      }
    ],
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
        [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
      ]
    },
    group: ['Spot.id', 'Owner.id', 'SpotImages.id']
  });

  if (spot) {
    res.status(200).json(spot);
  } else {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    });
  }
});


module.exports = router;