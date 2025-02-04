//Imports
const express = require('express')
const router = express.Router();

// --Utility Imports--
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { Spot, Sequelize } = require('../../db/models');

const router = express.Router();

// -- Protects incoming Data for spot creation route--
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

// Create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
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
      } = req.body
    );

  // Check for validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  // Set token cookie
  await setTokenCookie(res, req.user);

  // Return the new spot data
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
    updatedAt: spot.updatedAt
  });
});

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack that handles GET requests to the /spot/:id path
router.get('/spot/:id', (req, res, next) => {
  // if the spot ID is 0, skip to the next router
  if (req.params.id === '0') next('route');
  // otherwise pass control to the next middleware function in this stack
  else next();
}, (req, res, next) => {
  // render a regular page
  res.render('regular');
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /spot/:id path
router.use('/spot/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();

});

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router');
  next();
});

// handler for the /spot/:id path, which renders a special page
router.get('/spot/:id', (req, res, next) => {
  console.log(req.params.id);
  res.render('special');
});

// handler for the /spot/:id path, which sends a special response
router.get('/spot/:id', (req, res, next) => {
  res.send('hello, spot!');
  next();
});

module.exports = router;
