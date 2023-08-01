// routes/admin.js

const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/adminController');

// POST route for creating a new admin
router.post('/', AdminController.createAdmin);

// GET route for getting a specific admin by ID
router.get('/:id', AdminController.getAdminById);

// GET route for getting all admins
router.get('/', AdminController.getAllAdmins);

// PUT route for updating an admin by ID
router.put('/:id', AdminController.updateAdmin);

// DELETE route for deleting an admin by ID
router.delete('/:id', AdminController.deleteAdmin);

module.exports = router;
