const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Booking, Review, ReviewImage } = require('../../db/models'); 


// Validate Spots
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

// // Validation middleware for query parameters
// const validateQueryParams = [
//   query('page')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Page must be greater than or equal to 1'),
//   query('size')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Size must be greater than or equal to 1'),
//   query('minLat')
//     .optional()
//     .isFloat({ min: -90, max: 90 })
//     .withMessage('Minimum latitude is invalid'),
//   query('maxLat')
//     .optional()
//     .isFloat({ min: -90, max: 90 })
//     .withMessage('Maximum latitude is invalid'),
//   query('minLng')
//     .optional()
//     .isFloat({ min: -180, max: 180 })
//     .withMessage('Minimum longitude is invalid'),
//   query('maxLng')
//     .optional()
//     .isFloat({ min: -180, max: 180 })
//     .withMessage('Maximum longitude is invalid'),
//   query('minPrice')
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage('Minimum price must be greater than or equal to 0'),
//   query('maxPrice')
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage('Maximum price must be greater than or equal to 0'),
//   handleValidationErrors
// ];

// // Route to get all spots with query filters
// router.get('/', validateQueryParams, async (req, res) => {
//   let {
//     page = 1,
//     size = 20,
//     minLat,
//     maxLat,
//     minLng,
//     maxLng,
//     minPrice,
//     maxPrice
//   } = req.query;

//   page = parseInt(page);
//   size = parseInt(size);

//   const where = {};
//   if (minLat) where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
//   if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
//   if (minLng) where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
//   if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
//   if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
//   if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

//   try {
//     const spots = await Spot.findAll({
//       where,
//       limit: size,
//       offset: (page - 1) * size,
//       include: [
//         {
//           model: SpotImage,
//           attributes: ['url'],
//           where: { preview: true },
//           required: false
//         }
//       ]
//     });

//     const formattedSpots = spots.map(spot => {
//       const spotData = spot.toJSON();
//       spotData.previewImage = spotData.SpotImages.length ? spotData.SpotImages[0].url : null;
//       delete spotData.SpotImages;
//       return spotData;
//     });

//     return res.json({
//       Spots: formattedSpots,
//       page,
//       size
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

//Create a Spot
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
    return res.status(400).json({ error: error.message });
  }
});

// Get All spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    return res.json(spots);
  } catch (error) {
    return res.status(500).json({ error: "Incorrect details for your Spot. Please use accurate information." });
  }
});

// Get spot by id
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.id); 
    //   {
    //   include: [
    //     {
    //       model: User,
    //       as: 'Owner',
    //       attributes: ['id', 'firstName', 'lastName']
    //     }
    //   ]
    // });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    return res.json(spot);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//get spots
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.id, 
      {
      include: [
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    return res.json(spot);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get spots by owner id
router.get('/currentUser', requireAuth, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const spot = await Spot.findAll({
      where: { ownerId }
    });

    return res.status(200).json(spot);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//Edit a spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  try {
    const spot = await Spot.findOne({
      where: {
        id,
        ownerId: userId
      }
    });

    if (!spot) {
      return res.status(404).json({ message: 'Spot not found or you do not have permission to edit this spot' });
    }

    spot.address = address || spot.address;
    spot.city = city || spot.city;
    spot.state = state || spot.state;
    spot.country = country || spot.country;
    spot.lat = lat || spot.lat;
    spot.lng = lng || spot.lng;
    spot.name = name || spot.name;
    spot.description = description || spot.description;
    spot.price = price || spot.price;

    await spot.save();

    return res.json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      previewImage: null,
      avgRating: null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the spot' });
  }
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (spot.ownerId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    await spot.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (e) {
    next(e);
  }
});


module.exports = router;