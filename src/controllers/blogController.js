const BlogPost = require('../models/BlogPost');
const { validationResult } = require('express-validator');

// @desc    Get all blog posts (with optional filters)
// @route   GET /api/blog
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const { category, featured, search, limit } = req.query;

    const filter = { published: true };

    if (category && category !== 'All') {
      filter.$or = [
        { category: category },
        { tags: { $in: [category] } },
      ];
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    let query = BlogPost.find(filter).sort({ publishDate: -1, createdAt: -1 });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const posts = await query;

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blog posts.' });
  }
};

// @desc    Get a single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Get post error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blog post.' });
  }
};

// @desc    Get a single blog post by ID
// @route   GET /api/blog/id/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Get post by ID error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blog post.' });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Public
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const post = await BlogPost.create(req.body);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error('Create post error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A post with this slug already exists.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to create blog post.' });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Public
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update blog post.' });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Public
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
    return res.status(200).json({ success: true, message: 'Blog post deleted.' });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete blog post.' });
  }
};

// @desc    Like a blog post
// @route   POST /api/blog/:id/like
// @access  Public
const likePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
    return res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    console.error('Like post error:', error);
    return res.status(500).json({ success: false, message: 'Failed to like post.' });
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
