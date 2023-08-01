const mysql = require('mysql2/promise');
const { dbConnection } = require('../constants.js');
const { getCustomerAge } = require('./customer.js');

// Create a connection pool for MySQL
const pool = mysql.createPool(dbConnection);

const query = async (sql, values) => {
  const [rows, fields] = await pool.execute(sql, values);
  return rows;
};

const getLoanById = async (loanId) => {
  const sql = 'SELECT * FROM loan WHERE loan_id = ?';
  const values = [loanId];
  const result = await query(sql, values);
  return result[0];
};

const getAllLoans = async () => {
  const sql = 'SELECT * FROM loan';
  const result = await query(sql);
  return result;
};

const getLoanInterestRate = async (loanId) => {
  try {
    const sql = `
      SELECT lt.interest_rate
      FROM loan AS l
      JOIN loan_type AS lt ON l.loan_type = lt.id
      WHERE l.loan_id = ?
    `;
    const [rows] = await pool.query(sql, [loanId]);

    if (rows.length === 0) {
      throw new Error('Loan not found');
    }

    return rows[0].interest_rate;
  } catch (error) {
    throw error;
  }
};

// ... (previous code)

const createLoan = async (branchId, customerId, amount, weeks) => {
  try {
    // Determine the loan_type based on the branch and other conditions
    let loanType, interest_rate, admin_fee = 250;

    if (branchId === 'Mapoteng') {
      const customerAge = await getCustomerAge(customerId);

      if (customerAge > 60) {
        loanType = 'over_sixty';
        interest_rate = 0.15;
        admin_fee = 50;
      } else {
        loanType = 'under_sixty';
        interest_rate = 0.2;
      }
    } else if (branchId === 'Maseru') {
      //const loanDurationInWeeks = 4; // Assuming you have a way to get the loan duration in weeks
      if (weeks === 4) {
        loanType = 'biz_four_weeks';
        interest_rate = 0.25;
      } else if(weeks === 2) {
        loanType = 'biz_two_weeks';
        interest_rate = 0.125;
      }
    }

    const accrual = amount * interest_rate,
          balance = amount + accrual + admin_fee;
    //      created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql1 = `
      INSERT INTO loan (branch, loan_type, customer)
      VALUES (?, ?, ?)
    `;

    const sql2 = `
      INSERT INTO loan_amount_due (loan, principal, admin_fee, interest_rate, accrual, balance)
      VALUES (?, ?, ?)
    `;

    console.log({sql1, sql2});

    // Execute the first SQL query to insert into the loan table
    const [result] = await pool.query(sql1, [branchId, loanType, customerId]);
    const loanId = result.insertId; // Get the ID of the newly created loan

    console.log({loanId})

    // Execute the second SQL query to insert into the loan_amount_due table
    // const principal = 0; // Set the initial principal amount (you can change this as per your requirement)
    await pool.query(sql2, [loanId, amount, admin_fee, interest_rate, accrual, balance]);

    return loanId;
  } catch (error) {
    throw error;
  }
};

//# UPDATE WEEKS
const updateLoan = async (loanId, branchId, customerId, amount, weeks) => {
  try {
    let loanType, interest_rate, admin_fee = 250;

    if (branchId === 'Mapoteng') {
      const customerAge = await getCustomerAge(customerId);

      if (customerAge > 60) {
        loanType = 'over_sixty';
        interest_rate = 0.15;
        admin_fee = 50;
      } else {
        loanType = 'under_sixty';
        interest_rate = 0.2;
      }
    } else if (branchId === 'Maseru') {
      //const loanDurationInWeeks = 4; // Assuming you have a way to get the loan duration in weeks
      if (weeks === 4) {
        loanType = 'biz_four_weeks';
        interest_rate = 0.25;
      } else if(weeks === 2) {
        loanType = 'biz_two_weeks';
        interest_rate = 0.125;
      }
    }

    const sql1 = `
      UPDATE loan
      SET customer = ?, loan_type = ?
      WHERE loan_id = ?
    `;

    const [result] = await pool.query(sql1, [branchId, customerId, loanType, loanId]);

    if(!!amount) {
      const accrual = amount * interest_rate;

      const sql2 = `
        UPDATE loan_amount_due
        SET principal = ?,
        accrual = ?
        admin_fee = ?
        WHERE loan = ?
      `;

      await pool.query(sql2, [amount, accrual, admin_fee, loanId]);
    }

    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const deleteLoan = async (loanId) => {
  try {
    const sql = 'DELETE FROM loan WHERE loan_id = ?';
    const [result] = await pool.query(sql, [loanId]);
    return result.affectedRows > 0; // Return true if the deletion was successful
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLoanInterestRate,
  createLoan,
  updateLoan,
  deleteLoan,
  getLoanById,
  getAllLoans
};