const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '/placeholder.jpg',
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain', 'Web'],
      required: true,
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Planning'],
      default: 'Completed',
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0, // for manual ordering
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });

module.exports = mongoose.model('Project', projectSchema);
