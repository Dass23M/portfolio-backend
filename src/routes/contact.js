const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts, updateContactStatus } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validate');

// POST /api/contact – Submit a new contact message
router.post('/', validateContact, submitContact);

// GET /api/contact – Get all contact messages (admin)
router.get('/', getAllContacts);

// PATCH /api/contact/:id/status – Update status (admin)
router.patch('/:id/status', updateContactStatus);

module.exports = router;
