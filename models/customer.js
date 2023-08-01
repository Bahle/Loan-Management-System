// models/customer.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to query the database
const query = async (sql, values) => {
  const [rows, fields] = await pool.execute(sql, values);
  return rows;
};

// Model functions
const createCustomer = async (customer) => {
  const sql = 'INSERT INTO customer (name, surname, dob, gender, address, tel, cell) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [customer.name, customer.surname, customer.dob, customer.gender, customer.address, customer.tel, customer.cell];
  // console.log({values});
  const result = await query(sql, values);
  // console.log({result});
  return result.insertId;
};

const getCustomerById = async (customerId) => {
  const sql = 'SELECT * FROM customer WHERE customer_id = ?';
  const values = [customerId];
  const result = await query(sql, values);
  return result[0];
};

const getAllCustomers = async () => {
  const sql = 'SELECT * FROM customer';
  const result = await query(sql);
  return result;
};

// Function to update a customer by ID
const updateCustomerById = async (customerId, updatedCustomerData) => {
  console.log('updateCustomerById')
  console.log({updatedCustomerData})
  const sql = 'UPDATE customer SET ? WHERE customer_id = ?';
  const [result] = await pool.query(sql, [updatedCustomerData, customerId]);
  return result.affectedRows > 0;
};

// Function to delete a customer by ID
const deleteCustomerById = async (customerId) => {
  const sql = 'UPDATE customer SET deleted = 1 WHERE customer_id = ?';
  const [result] = await pool.query(sql, [customerId]);
  return result.affectedRows > 0;
};

const getCustomerAge = async (customerId) => {
  try {
    const sql = 'SELECT dob FROM customer WHERE customer_id = ?';
    const [rows] = await pool.query(sql, [customerId]);

    if (rows.length === 0) {
      throw new Error('Customer not found');
    }

    const dob = new Date(rows[0].dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomerById,
  deleteCustomerById,
  getCustomerAge
};
