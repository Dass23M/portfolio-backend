const { body } = require('express-validator');

// Validation rules for contact form
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

// Validation rules for newsletter subscription
const validateSubscription = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
];

// Validation rules for creating a project
const validateProject = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain', 'Web'])
    .withMessage('Invalid category'),
  body('date').notEmpty().withMessage('Date is required'),
];

// Validation rules for blog post
const validateBlogPost = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('publishDate').notEmpty().withMessage('Publish date is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['React', 'Next.js', 'Node.js', 'Python', 'Database', 'DevOps', 'UI/UX', 'Career', 'Tutorial'])
    .withMessage('Invalid category'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
];

module.exports = {
  validateContact,
  validateSubscription,
  validateProject,
  validateBlogPost,
};
