const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Methmal',
    },
    publishDate: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    category: {
      type: String,
      required: true,
      enum: ['React', 'Next.js', 'Node.js', 'Python', 'Database', 'DevOps', 'UI/UX', 'Career', 'Tutorial'],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for slug lookups and category filtering
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ featured: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
