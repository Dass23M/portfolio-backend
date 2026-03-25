const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController');
const { validateSubscription } = require('../middleware/validate');

// POST /api/newsletter/subscribe
router.post('/subscribe', validateSubscription, subscribe);

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', unsubscribe);

// GET /api/newsletter/subscribers (admin)
router.get('/subscribers', getAllSubscribers);

module.exports = router;
