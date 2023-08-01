// models/notification.js

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

// Function to get all notifications with pagination
const getNotifications = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const sql = 'SELECT * FROM notifications ORDER BY created_at DESC LIMIT ?, ?';
  const [rows] = await pool.query(sql, [offset, pageSize]);
  return rows;
};

// Function to get a specific notification by ID
const getNotificationById = async (notificationId) => {
  const sql = 'SELECT * FROM notifications WHERE notification_id = ?';
  const [rows] = await pool.query(sql, [notificationId]);
  return rows[0];
};

// Function to create a new notification
const createNotification = async (newNotification) => {
  const sql = 'INSERT INTO notifications SET ?';
  const [result] = await pool.query(sql, newNotification);
  return result.insertId;
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification
};
