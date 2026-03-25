const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// @desc    Get all projects (with optional filters)
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const { category, featured, search } = req.query;

    // Build filter object
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(filter).sort({ order: 1, date: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    // Increment view count
    project.views += 1;
    await project.save();

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Get project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch project.' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (add auth middleware for production)
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
};

// @desc    Like a project
// @route   POST /api/projects/:id/like
// @access  Public
const likeProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, likes: project.likes });
  } catch (error) {
    console.error('Like project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to like project.' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
};
