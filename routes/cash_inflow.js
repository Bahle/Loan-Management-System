// routes/cash_inflow.js

const express = require('express');
const router = express.Router();

const CashInflowController = require('../controllers/cash_inflowController');

// POST route for creating a new cash inflow record
router.post('/', CashInflowController.createCashInflow);

// GET route for getting a specific cash inflow record by ID
router.get('/:id', CashInflowController.getCashInflowById);

// GET route for getting all cash inflow records
router.get('/', CashInflowController.getAllCashInflows);

// PUT route for updating a cash inflow record by ID
router.put('/:id', CashInflowController.updateCashInflow);

// DELETE route for deleting a cash inflow record by ID
router.delete('/:id', CashInflowController.deleteCashInflow);

module.exports = router;
