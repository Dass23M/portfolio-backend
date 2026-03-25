const Subscriber = require('../models/Subscriber');
const { validationResult } = require('express-validator');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
      errors: errors.array(),
    });
  }

  const { email } = req.body;

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (existing.subscribed) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed! 🎉',
        });
      }

      // Re-subscribe if they previously unsubscribed
      existing.subscribed = true;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: 'Welcome back! You have been re-subscribed.',
      });
    }

    await Subscriber.create({ email });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Thank you for joining. 🎉',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.',
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
const unsubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { subscribed: false },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Email not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'You have been unsubscribed successfully.',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).json({ success: false, message: 'Failed to unsubscribe.' });
  }
};

// @desc    Get all subscribers (admin)
// @route   GET /api/newsletter/subscribers
// @access  Public
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ subscribed: true }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
};

module.exports = { subscribe, unsubscribe, getAllSubscribers };
