// middleware/checkRecordDate.js

const mysql = require('mysql2/promise');
const { threeDaysAgo, sevenDaysAgo } = require('../helpers/dateUtils');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Middleware function to check if record's created_at value meets the criteria
const checkRecordDate = async (req, res, next) => {
  const tableName = req.originalUrl.match(/\/api\/(\w+)/)[1];
  const recordId = req.params.id;
  console.log('checkRecordDate');

  try {
    // Get the record's createdAt date using a MySQL query
    const sql = `SELECT created_at FROM ${tableName} WHERE ${tableName}_id = ?`;
    console.log({sql});
    const values = [recordId]; //; [tableName, recordId];
    const [rows] = await pool.execute(sql, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const createdAtDate = rows[0].created_at;

    if (req.method === 'PUT' || req.method === 'PATCH') {
      // Check if the record's createdAt date is less than 3 days ago
      if (createdAtDate < threeDaysAgo()) {
        return res.status(403).json({ error: 'Cannot update record, it is older than 3 days' });
      }
    } else if (req.method === 'DELETE') {
      // Check if the record's createdAt date is less than 7 days ago
      if (createdAtDate < sevenDaysAgo()) {
        return res.status(403).json({ error: 'Cannot delete record, it is older than 7 days' });
      }
    }

    // If the conditions are met, move to the next middleware/route handler
    next();
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Something went wrong', message: error });
  }
};

module.exports = checkRecordDate;
