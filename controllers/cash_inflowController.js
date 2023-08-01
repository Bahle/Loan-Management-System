const { createCashInflow, getCashInflowById, getAllCashInflows, updateCashInflowById, deleteCashInflowById } = require('../models/cash_inflow');
const logChanges = require('../helpers/logChanges');// controllers/cashInflowController.js

// Controller function to create a new cash inflow record
exports.createCashInflow = async (req, res) => {
  try {
    const newCashInflow = {
      amount: req.body.amount,
      // Add other fields as needed based on your cash_inflow schema
    };
    const cashInflowId = await createCashInflow(newCashInflow);
    res.status(201).json({ message: 'Cash inflow created successfully', cashInflowId });
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to create cash inflow' });
  }
};

// Controller function to get a specific cash inflow record by ID
exports.getCashInflowById = async (req, res) => {
  try {
    const cashInflowId = req.params.cashInflowId;
    const cashInflow = await getCashInflowById(cashInflowId);
    if (cashInflow) {
      res.json(cashInflow);
    } else {
      res.status(404).json({ error: 'Cash inflow not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch cash inflow' });
  }
};

// Controller function to get all cash inflow records
exports.getAllCashInflows = async (req, res) => {
  try {
    const cashInflows = await getAllCashInflows();
    res.json(cashInflows);
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch cash inflows' });
  }
};

// Controller function to update a cash inflow record by ID
exports.updateCashInflow = async (req, res) => {
  try {
    const cashInflowId = req.params.cashInflowId;
    const updatedCashInflowData = {
      amount: req.body.amount,
      // Add other fields as needed based on your cash_inflow schema
    };
    const updated = await updateCashInflowById(cashInflowId, updatedCashInflowData);
    if (updated) {
      logChanges('cash_inflow', req);
      res.json({ message: 'Cash inflow updated successfully' });
    } else {
      res.status(404).json({ error: 'Cash inflow not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to update cash inflow' });
  }
};

// Controller function to delete a cash inflow record by ID
exports.deleteCashInflow = async (req, res) => {
  try {
    const cashInflowId = req.params.cashInflowId;
    const deleted = await deleteCashInflowById(cashInflowId);
    if (deleted) {
      logChanges('cash_inflow', req);
      res.json({ message: 'Cash inflow deleted successfully' });
    } else {
      res.status(404).json({ error: 'Cash inflow not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to delete cash inflow' });
  }
};
