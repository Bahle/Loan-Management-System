const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// GET route to fetch the loan interest rate by loan ID
router.post('/', loanController.createLoan);

router.get('/:id', loanController.getLoanById);

// Route to get all customer getAllLoans
router.get('/', loanController.getAllLoans);

// PUT route to update an existing loan by loan ID
router.put('/:id', loanController.updateLoan);

// DELETE route to delete an existing loan by loan ID
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
