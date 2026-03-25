const express = require('express');
const router = express.Router();
const { login, getMe, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// POST /api/auth/login – Admin login (public)
router.post('/login', login);

// GET /api/auth/me – Get current admin profile (protected)
router.get('/me', protect, getMe);

// PUT /api/auth/change-password – Change password (protected)
router.put('/change-password', protect, changePassword);

module.exports = router;
