const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { name, email, message } = req.body;

  try {
    // Save the contact message to MongoDB Atlas
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip || req.headers['x-forwarded-for'],
    });

    // Optional: Send email notification via Nodemailer
    // You can enable this block if you configure your email credentials
    /*
    const transporter = require('nodemailer').createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! I will get back to you within 24 hours.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit your message. Please try again.',
    });
  }
};

// @desc    Get all contact submissions (admin)
// @route   GET /api/contact
// @access  Public (can add auth middleware later)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts.',
    });
  }
};

// @desc    Mark a contact as read
// @route   PATCH /api/contact/:id/status
// @access  Public
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use: new, read, replied',
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Update contact error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update contact.' });
  }
};

module.exports = { submitContact, getAllContacts, updateContactStatus };
