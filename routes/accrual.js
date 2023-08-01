const express = require('express');
const router = express.Router();
const accrualController = require('../controllers/accrualController');

// POST route to create an accrual for a specific loan
router.post('/', accrualController.createAccruals);

module.exports = router;
