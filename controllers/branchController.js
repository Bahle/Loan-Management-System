 // controllers/branchController.js

const { createBranch, getBranchById, getAllBranches, updateBranchById, deleteBranchById } = require('../models/branch');

// Controller function to create a new branch
exports.createBranch = async (req, res) => {
  try {
    const newBranch = {
      name: req.body.name,
      // Add other fields as needed based on your branch schema
    };
    const branchId = await createBranch(newBranch);
    res.status(201).json({ message: 'Branch created successfully', branchId });
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to create branch' });
  }
};

// Controller function to get a specific branch by ID
exports.getBranchById = async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const branch = await getBranchById(branchId);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch branch' });
  }
};

// Controller function to get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await getAllBranches();
    res.json(branches);
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch branches' });
  }
};

// Controller function to update a branch by ID
exports.updateBranch = async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const updatedBranchData = {
      name: req.body.name,
      // Add other fields as needed based on your branch schema
    };
    const updated = await updateBranchById(branchId, updatedBranchData);
    if (updated) {
      res.json({ message: 'Branch updated successfully' });
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to update branch' });
  }
};