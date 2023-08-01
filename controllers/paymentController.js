// controllers/paymentController.js
const logChanges = require('../helpers/logChanges');

const { createPayment, getPaymentById, getAllPayments, updatePaymentById, deletePaymentById } = require('../models/payment');

// Controller function to create a new payment
exports.createPayment = async (req, res) => {
  try {
    const newPayment = {
      loan: req.body.loan,
      amount: req.body.amount
    };
    const paymentId = await createPayment(newPayment);
    res.status(201).json({ message: 'Payment created successfully', paymentId });
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to create payment' });
  }
};

// Controller function to get a specific payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const payment = await getPaymentById(paymentId);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch payment' });
  }
};

// Controller function to get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch payments' });
  }
};

// Controller function to update a payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const updatedPaymentData = {
      type: req.body.type,
      loan: req.body.loan,
      date: req.body.date,
      amount: req.body.amount
      // Add other fields as needed based on your payment schema
    };
    const updated = await updatePaymentById(paymentId, updatedPaymentData);
    if (updated) {
      logChanges('payment', req);
      res.json({ message: 'Payment updated successfully' });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to update payment' });
  }
};

// Controller function to delete a payment by ID
exports.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const deleted = await deletePaymentById(paymentId);
    if (deleted) {
      logChanges('payment', req);
      res.json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
  console.log('Error occured: ', error);
  res.status(500).json({ error: 'Unable to delete payment' });
  }
};
