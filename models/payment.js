// models/payment.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to create a new payment
const createPayment = async (newPayment) => {
  const sql = 'INSERT INTO payment SET ?';
  const [result] = await pool.query(sql, newPayment);
  return result.insertId;
};

// Function to get a specific payment by ID
const getPaymentById = async (paymentId) => {
  const sql = 'SELECT * FROM payment WHERE payment_id = ?';
  const [rows] = await pool.query(sql, [paymentId]);
  return rows[0];
};

// Function to get all payments
const getAllPayments = async () => {
  const sql = 'SELECT * FROM payment';
  const [rows] = await pool.query(sql);
  return rows;
};

// Function to update a payment by ID
const updatePaymentById = async (paymentId, updatedPaymentData) => {
  const sql = 'UPDATE payment SET ? WHERE payment_id = ?';
  const [result] = await pool.query(sql, [updatedPaymentData, paymentId]);
  return result.affectedRows > 0;
};

// Function to delete a payment by ID
const deletePaymentById = async (paymentId) => {
  const sql = 'DELETE FROM payment WHERE payment_id = ?';
  const [result] = await pool.query(sql, [paymentId]);
  return result.affectedRows > 0;
};

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePaymentById,
  deletePaymentById
};
