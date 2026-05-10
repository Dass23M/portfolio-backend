const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { login, getMe, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Rate limiting for login to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Validation middleware for login
const loginValidation = [
  check('username', 'Username or Email is required').notEmpty().trim().escape(),
  check('password', 'Password is required').notEmpty().trim()
];

// POST /api/auth/login – Admin login (public)
router.post('/login', loginLimiter, loginValidation, login);

// GET /api/auth/me – Get current admin profile (protected)
router.get('/me', protect, getMe);

// PUT /api/auth/change-password – Change password (protected)
router.put('/change-password', protect, changePassword);

module.exports = router;
