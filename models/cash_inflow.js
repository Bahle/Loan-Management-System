// models/cash_inflow.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to create a new cash inflow record
const createCashInflow = async (newCashInflow) => {
  const sql = 'INSERT INTO cash_inflow SET ?';
  const [result] = await pool.query(sql, newCashInflow);
  return result.insertId;
};

// Function to get a specific cash inflow record by ID
const getCashInflowById = async (cashInflowId) => {
  const sql = 'SELECT * FROM cash_inflow WHERE cash_inflow_id = ?';
  const [rows] = await pool.query(sql, [cashInflowId]);
  return rows[0];
};

// Function to get all cash inflow records
const getAllCashInflows = async () => {
  const sql = 'SELECT * FROM cash_inflow';
  const [rows] = await pool.query(sql);
  return rows;
};

// Function to update a cash inflow record by ID
const updateCashInflowById = async (cashInflowId, updatedCashInflowData) => {
  const sql = 'UPDATE cash_inflow SET ? WHERE cash_inflow_id = ?';
  const [result] = await pool.query(sql, [updatedCashInflowData, cashInflowId]);
  return result.affectedRows > 0;
};

// Function to delete a cash inflow record by ID
const deleteCashInflowById = async (cashInflowId) => {
  const sql = 'DELETE FROM cash_inflow WHERE cash_inflow_id = ?';
  const [result] = await pool.query(sql, [cashInflowId]);
  return result.affectedRows > 0;
};

module.exports = {
  createCashInflow,
  getCashInflowById,
  getAllCashInflows,
  updateCashInflowById,
  deleteCashInflowById
};
