// routes/branch.js

const express = require('express');
const router = express.Router();

const BranchController = require('../controllers/branchController');

// POST route for creating a new branch
router.post('/branch/', BranchController.createBranch);

// GET route for getting a specific branch by ID
router.get('/branch/:id', BranchController.getBranchById);

// GET route for getting all branches
router.get('/branch/', BranchController.getAllBranches);

// PUT route for updating a branch by ID
router.put('branch/:id', BranchController.updateBranch);

module.exports = router;