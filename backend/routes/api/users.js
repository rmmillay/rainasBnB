//Imports
const express = require('express')
const bcrypt = require('bcryptjs');

// --Utility Imports--
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { User, Sequelize } = require('../../db/models');


const router = express.Router();
// -- Protects incoming Data for sign up route--
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}
);


// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route')
    // otherwise pass control to the next middleware function in this stack
    else next()
  }, (req, res, next) => {
    // render a regular page
    res.render('regular') 
    next()
  })

  // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
  router.use('/user/:id', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })
  

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
    if (!req.headers['x-auth']) return next('router')
    next()
  })

 // handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
    console.log(req.params.id)
    res.render('special')
  })

// handler for the /user/:id path, which sends a special response
router.get('/user/:id', (req, res, next) => {
    res.send('hello, user!') 
    next()
  })



module.exports = router;