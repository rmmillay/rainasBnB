
//Imports
const express = require('express')
const router = express.Router();

// --Utility Imports--
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
 
// --Sequelize Imports--
const { Spot } = require('../../db/models');


// --Create New Spot--
router.post('/', async (req, res) => {
  try {
    const { ownerId, address } = req.body;
    
    const spot = await Spot.create({
      ownerId,
      address
    });
    
      await setTokenCookie(res);

      return res.status(201).json(spot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --Get All Spots--
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots);
  } catch (error) {
      res.status(500).json({ error: error.message }); // ?
  }
});


// --Get Spot By Id--
router.get('/:id', async (req, res) => {
   try {
     const spot = await Spot.findByPk(req.params.id);
     if (!spot) {
        return res.status(404).json({ error: "Spot not found"});
     }
      res.json(spot);
   } catch (error) {
       res.status(500).json({ error: error.message });
  }

});

module.exports = router;