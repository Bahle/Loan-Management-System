// routes/payment.js

const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/paymentController');

// POST route for creating a new payment
router.post('/', PaymentController.createPayment);

// GET route for getting a specific payment by ID
router.get('/:id', PaymentController.getPaymentById);

// GET route for getting all payments
router.get('/', PaymentController.getAllPayments);

// PUT route for updating a payment by ID
router.put('/:id', PaymentController.updatePayment);

// DELETE route for deleting a payment by ID
router.delete('/:id', PaymentController.deletePayment);

module.exports = router;
