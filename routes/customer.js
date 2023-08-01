// routes.js

const express = require('express');
const router = express.Router();

// Import the customer model
const CustomerController = require('../controllers/customerController');
const checkRecordDate = require('../middleware/checkRecordDate.js');


// Route to create a new customer createCustomer
router.post('/', CustomerController.createCustomer);

// Route to get a customer by ID get getCustomerById
router.get('/:id', CustomerController.getCustomerById);

// Route to get all customer getAllCustomers
router.get('/', CustomerController.getAllCustomers);

// PUT route for updating a customer
router.put('/:id', checkRecordDate, CustomerController.updateCustomer);

// DELETE route for deleting a customer
router.delete('/:id', checkRecordDate, CustomerController.deleteCustomer);

module.exports = router;
