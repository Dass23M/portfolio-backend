const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Client role/title is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '', // URL or Base64 avatar
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5,
    },
    reviewType: {
      type: String,
      enum: [
        'Web Development',
        'UI/UX Design',
        'API/Backend',
        'E-Commerce',
        'Consultation',
        'Assignment Help',
      ],
      required: [true, 'Review type is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ isPublished: 1, order: 1 });
reviewSchema.index({ featured: 1 });

module.exports = mongoose.model('Review', reviewSchema);
