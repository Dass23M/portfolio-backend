const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewsController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllReviews);
router.get('/:id', getReviewById);

// Admin-protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
