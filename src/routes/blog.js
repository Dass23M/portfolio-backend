const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/blogController');
const { validateBlogPost } = require('../middleware/validate');

// GET /api/blog – Get all published posts (supports ?category=&featured=&search=&limit=)
router.get('/', getAllPosts);

// GET /api/blog/id/:id – Get post by MongoDB ID
router.get('/id/:id', getPostById);

// GET /api/blog/:slug – Get single post by slug (must come AFTER /id/:id)
router.get('/:slug', getPostBySlug);

// POST /api/blog – Create new post
router.post('/', validateBlogPost, createPost);

// PUT /api/blog/:id – Update post
router.put('/:id', updatePost);

// DELETE /api/blog/:id – Delete post
router.delete('/:id', deletePost);

// POST /api/blog/:id/like – Like a post
router.post('/:id/like', likePost);

module.exports = router;
