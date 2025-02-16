const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, User, ReviewImage, SpotImage } = require('../../db/models');





// Validation middleware for review data
// TODO: Do this validation
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 256 })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Add a Review Image to an existing Review based on Review Id (user auth required)
router.post('/:id/images', requireAuth, async (req, res, next) => {
  try {
    // TODO: Do this route
    return res.json(":)")
  } catch (e) {
    next(e);
  }
});


// Route to get all reviews written by the current user
router.get('/reviews/current', requireAuth, async (req, res,) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
          include: [
            {
              model: SpotImage,
              attributes: ['url'],
              where: { preview: true },
              required: false
            }
          ]
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });

    // Formatting the reviews to make it pretty
    const formattedReviews = reviews.map(review => {
      const reviewData = review.toJSON();
      if (reviewData.Spot && reviewData.Spot.SpotImages && reviewData.Spot.SpotImages.length > 0) {
        reviewData.Spot.previewImage = reviewData.Spot.SpotImages[0].url;
      } else {
        reviewData.Spot.previewImage = null;
      }
      delete reviewData.Spot.SpotImages;
      return reviewData;
    });

    return res.json({ Reviews: formattedReviews });
  } catch (error) {
    next(error);
  }
});



// Route to update an existing review
router.put('/reviews/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    // Find a review before trying to update it
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      // TODO: Error handling
      let noExistingReviewError = new Error("Review couldn't be found");
      noExistingReviewError.status = 404;
      throw noExistingReviewError;
    }

    if (existingReview.userId !== userId) {
      // TODO: Error handling
      let notUserReviewError = new Error("Forbidden: This is not your review");
      notUserReviewError.status = 403;
      throw notUserReviewError;
    }

    // Editing the keys that we want to update
    existingReview.review = review;
    existingReview.stars = stars;
    // Save the changes --- update
    await existingReview.save();
    //  Add status message
    return res.json(existingReview);
  } catch (error) {
    next(error);
  }
});

// Route to delete an existing review
router.delete('/reviews/:reviewId', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    // Find a review before trying to update it
    const review = await Review.findByPk(reviewId);

    if (!existingReview) {
      // TODO: Error handling
      let noExistingReviewError = new Error("Review couldn't be found");
      noExistingReviewError.status = 404;
      throw noExistingReviewError;
    }

    if (existingReview.userId !== userId) {// 
      // TODO: Error handling
      let notUserReviewError = new Error("Forbidden: This is not your review");
      notUserReviewError.status = 403;
      throw notUserReviewError;
    }

    // Deletes a review
    await review.destroy();

    // TODO: Add a status MEssage
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
