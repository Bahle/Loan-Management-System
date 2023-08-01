const accrualController = {};

const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');

const interval = -1;

const pool = mysql.createPool(dbConnection);

// Controller function to create an accrual for a specific loan
accrualController.createAccruals = async (req, res) => {
  const query = `
    SELECT loan, created_at
    FROM loan_amount_due
    WHERE CURDATE() > DATE_ADD(created_at, INTERVAL ? DAY) AND balance > 0
    ORDER BY created_at ASC
    LIMIT 1
  `;

  // Execute the query using the pool
  const [results, fields,rawSql] = await pool.query(query, [interval]);

  console.log({query});

  let createdRecords = [];

  // Loop through the result set
  results.forEach(async (row) => {
    const { loan, created_at: startDate } = row;
    console.log('Got:', {loan, startDate});

    // =================
    // Query 1: Get the latest balance for the loan
    const query1 = `
      SELECT loan_amount_due_id, balance, interest_rate
      FROM loan_amount_due
      WHERE loan = ? 
      ORDER BY created_at DESC
      LIMIT 1
    `;
    console.log({query1});

    const [results1] = await pool.query(query1, [loan]);
    const { loan_amount_due_id, balance, interest_rate } = results1[0];

    // Query 2: Calculate the total paid for the loan in the last 30 days
    //# removet the applied condition later
    const query2 = `
      SELECT SUM(amount) AS total_paid
      FROM payment
      WHERE loan = ? AND created_at >= ? AND created_at < DATE_ADD(?, INTERVAL 30 DAY) AND applied = 0
    `;
    console.log({query2});

    const [results2] = await pool.query(query2, [loan, startDate, startDate]);
    const totalPaid = results2[0].total_paid || 0; // If there are no payments, default to 0

    // update the last record to for easy tracking of payments
    await pool.query(`UPDATE loan_amount_due SET paid_amount = ? WHERE loan_amount_due_id = ?`, [totalPaid, loan_amount_due_id]);

    // Calculations
    const principal = balance - totalPaid;
    const accrual = interest_rate * principal;
    const newBalance = principal + accrual;

    console.log('Balance:', balance);
    console.log('Principal:', principal);
    console.log('Accrual:', accrual);
    console.log('New Balance:', newBalance);

    // Query 3: Insert data into the loan_amount_due table
    const query3 = `
      INSERT INTO loan_amount_due(loan, principal, admin_fee, interest_rate, accrual, balance)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    
   const [result] = await pool.query(query3, [loan, principal, 0, interest_rate, accrual, newBalance]);

    console.log('New record inserted into loan_amount_due table. [' + result.insertId + ']');

    // pool.end();

    // if(process.env.NODE_ENV === 'development')
    //# remove this code later
    const sql3 = `UPDATE payment 
      SET applied = 1 
      WHERE loan = ? 
      AND created_at >= ? 
      AND created_at < DATE_ADD(?, INTERVAL 30 DAY)`;

     // Execute the query asynchronously using async/await
     const [results, fields] = await pool.query(sql3, [loan, startDate, startDate]);
     console.log('Update successful. Rows affected:', results.affectedRows);

    return createdRecords.push(result.insertId);
    // =================
  });

  // Send the response
  res.status(201).json({
    message: 'Accruals created successfully',
    data: createdRecords,
  });
};

module.exports = accrualController;
