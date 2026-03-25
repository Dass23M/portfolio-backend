const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
} = require('../controllers/projectsController');
const { validateProject } = require('../middleware/validate');

// GET /api/projects – Get all projects (supports ?category=&featured=&search=)
router.get('/', getAllProjects);

// GET /api/projects/:id – Get single project
router.get('/:id', getProjectById);

// POST /api/projects – Create a new project
router.post('/', validateProject, createProject);

// PUT /api/projects/:id – Update a project
router.put('/:id', updateProject);

// DELETE /api/projects/:id – Delete a project
router.delete('/:id', deleteProject);

// POST /api/projects/:id/like – Like a project
router.post('/:id/like', likeProject);

module.exports = router;
