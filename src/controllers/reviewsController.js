const Review = require('../models/Review');

// @desc    Get all reviews (public)
// @route   GET /api/reviews
// @access  Public
const getAllReviews = async (req, res) => {
  try {
    const filter = {};

    // Public route — only return published reviews unless admin requests all
    const showAll = req.query.all === 'true';
    if (!showAll) {
      filter.isPublished = true;
    }

    if (req.query.featured !== undefined) {
      filter.featured = req.query.featured === 'true';
    }

    const reviews = await Review.find(filter).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }
    return res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error('Get review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch review.' });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (Admin)
const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    console.error('Create review error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to create review.' });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Admin)
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    return res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error('Update review error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to update review.' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }
    return res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete review.' });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
