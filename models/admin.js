// models/admin.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to create a new admin
const createAdmin = async (newAdmin) => {
  const sql = 'INSERT INTO admin SET ?';
  const [result] = await pool.query(sql, newAdmin);
  return result.insertId;
};

// Function to get a specific admin by ID
const getAdminById = async (adminId) => {
  const sql = 'SELECT * FROM admin WHERE admin_id = ?';
  const [rows] = await pool.query(sql, [adminId]);
  return rows[0];
};

// Function to get all admins
const getAllAdmins = async () => {
  const sql = 'SELECT * FROM admin';
  const [rows] = await pool.query(sql);
  return rows;
};

// Function to update an admin by ID
const updateAdminById = async (adminId, updatedAdminData) => {
  const sql = 'UPDATE admin SET ? WHERE admin_id = ?';
  const [result] = await pool.query(sql, [updatedAdminData, adminId]);
  return result.affectedRows > 0;
};

// Function to delete an admin by ID
const deleteAdminById = async (adminId) => {
  const sql = 'DELETE FROM admin WHERE admin_id = ?';
  const [result] = await pool.query(sql, [adminId]);
  return result.affectedRows > 0;
};

module.exports = {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminById,
  deleteAdminById
};
