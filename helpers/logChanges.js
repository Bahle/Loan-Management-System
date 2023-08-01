// middleware/logChanges.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');
// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

const dataTypesWithLog = ['payment', 'loan', 'cash_inflow'];
const fields = { payment: 'amount', loan: 'principal', cash_inflow: 'amount' }

const logChanges = async (dataType, req) => {
  try {
    // if (dataTypesWithLog.includes(dataType)) {
      const id = req.params.id; // Assuming the ID is part of the route
      const { amount } = req.body;
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Fetch the previous amount from the database
      const sql = `SELECT amount FROM ${fields[dataType]} WHERE ${dataType}_id = ?`;
      const [rows] = await pool.query(sql, [id]);
      const prevAmount = rows[0].amount;

      // Write the log entry
      const logData = {
        [`${dataType}`]: id,
        old_value: prevAmount,
        new_value: req.method === 'PUT' || req.method === 'PATCH' ? amount : 'deleted',
        created_at: currentDateTime
      };

      const logTable = `${dataType}_log`;
      const logSql = `INSERT INTO ${logTable} SET ?`;
      await pool.query(logSql, logData);
    // }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Error logging changes' });
  }
};

module.exports = logChanges;
