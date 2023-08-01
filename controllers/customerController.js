// controllers/userController.js

const { createCustomer, updateCustomerById, deleteCustomerById, getCustomerById, getAllCustomers } = require('../models/customer');

exports.createCustomer = async (req, res) => {
  // console.log({req})

  try {
    const newCustomer = {
      name: req.body.name,
      surname: req.body.surname,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address || '',
      tel: req.body.tel || '',
      cell: req.body.cell || ''
    };
    // console.log(1);
    const id = await createCustomer(newCustomer);
    // console.log(2);
    res.status(201).json({ message: 'Customer created successfully', id });
  } catch (error) {
    console.log('Error occured: ', error);
res.status(500).json({ error: 'Unable to create customer', message: error });
  }
}

exports.getCustomerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const customer = await getCustomerById(id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
res.status(500).json({ error: 'Unable to fetch customer' });
  }
}

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to fetch customers' });
  }
}

// Controller function to update a user
exports.updateCustomer = async (req, res) => {
  console.log('updateCustomer')
  try {
    const id = req.params.id;
    const updatedCustomerData = {
      name: req.body.name,
      surname: req.body.surname,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address || '',
      tel: req.body.tel || '',
      cell: req.body.cell || ''
    };
    console.log({updatedCustomerData, id});
    const updated = await updateCustomerById(id, updatedCustomerData);
    if (updated) {
      res.json({ message: 'Customer updated successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to update user' });
  }
};

// Controller function to delete a user
exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteCustomerById(id);
    if (deleted) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.log('Error occured: ', error);
    res.status(500).json({ error: 'Unable to delete user' });
  }
};
