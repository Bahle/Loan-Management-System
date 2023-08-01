const { getLoanById, getAllLoans, createLoan, updateLoan, deleteLoan } = require('../models/loan');
const logChanges = require('../helpers/logChanges');// controllers/cashInflowController.js

exports.getLoanById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const loan = await getLoanById(id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch loan', message: error });
  }
}

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await getAllLoans();
    res.json(loans);
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch loanz', message: error });
  }
}

exports.createLoan = async (req, res) => {
  try {
    const { branch_id, customer_id, amount, weeks } = req.body;
    const newLoanId = await createLoan(branch_id, customer_id, amount, weeks);
    console.log({newLoanId})
    res.json({ message: 'Loan created successfully', loanId: newLoanId });
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to create loan' });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const loan_id = req.params.id;
    const { branch_id, customer_id, amount, weeks } = req.body;
    if(!customer_id) {
      res.status(403).json({ error: 'Customer id not provided' });

      return;
    }

    if(!branch_id) {
      res.status(403).json({ error: 'Branch id not provided' });

      return;
    }

    const isUpdated = await updateLoan(loan_id, branch_id, customer_id, amount, weeks);
    if (isUpdated) {
      logChanges('loan', req);
      res.json({ message: 'Loan updated successfully' });
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to update loan', message: error });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const loanId = req.params.id;
    const isDeleted = await deleteLoan(loanId);
    if (isDeleted) {
      logChanges('loan', req);
      res.json({ message: 'Loan deleted successfully' });
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to delete loan', message: error });
  }
};
