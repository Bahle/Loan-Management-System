// models/branch.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to create a new branch
const createBranch = async (newBranch) => {
  const sql = 'INSERT INTO branch SET ?';
  const [result] = await pool.query(sql, newBranch);
  return result.insertId;
};

// Function to get a specific branch by ID
const getBranchById = async (branchId) => {
  const sql = 'SELECT * FROM branch WHERE branch_id = ?';
  const [rows] = await pool.query(sql, [branchId]);
  return rows[0];
};

// Function to get all branches
const getAllBranches = async () => {
  const sql = 'SELECT * FROM branch';
  const [rows] = await pool.query(sql);
  return rows;
};

// Function to update a branch by ID
const updateBranchById = async (branchId, updatedBranchData) => {
  const sql = 'UPDATE branch SET ? WHERE branch_id = ?';
  const [result] = await pool.query(sql, [updatedBranchData, branchId]);
  return result.affectedRows > 0;
};

module.exports = {
  createBranch,
  getBranchById,
  getAllBranches,
  updateBranchById
};
 
