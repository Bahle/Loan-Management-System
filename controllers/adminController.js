// controllers/adminController.js

const { createAdmin, getAdminById, getAllAdmins, updateAdminById, deleteAdminById } = require('../models/admin');

// Controller function to create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = {
      name: req.body.name,
      role: req.body.role,
      // Add other fields as needed based on your admin schema
    };
    const adminId = await createAdmin(newAdmin);
    res.status(201).json({ message: 'Admin created successfully', adminId });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create admin' });
  }
};

// Controller function to get a specific admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await getAdminById(adminId);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch admin' });
  }
};

// Controller function to get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch admins' });
  }
};

// Controller function to update an admin by ID
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const updatedAdminData = {
      name: req.body.name,
      role: req.body.role,
      // Add other fields as needed based on your admin schema
    };
    const updated = await updateAdminById(adminId, updatedAdminData);
    if (updated) {
      res.json({ message: 'Admin updated successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update admin' });
  }
};

// Controller function to delete an admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const deleted = await deleteAdminById(adminId);
    if (deleted) {
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
  res.status(500).json({ error: 'Unable to delete admin' });
  }
};
