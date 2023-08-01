const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const port = 3000; // Change this to the desired port number

// Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the developmentLogger middleware for all routes
const developmentLogger = require('./middleware/developmentLogger.js');
app.use(developmentLogger);


// Routes
const customerRouter = require('./routes/customer');
const loanRouter = require('./routes/loan');
const paymentRouter = require('./routes/payment');
const cashInflowRouter = require('./routes/cash_inflow');
const notificationRouter = require('./routes/notification');
const branchRouter = require('./routes/branch');
const adminRouter = require('./routes/admin');
const accrualRouter = require('./routes/accrual');

app.use('/api/customer', customerRouter);
app.use('/api/loan', loanRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/cash_inflow', cashInflowRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/branch', branchRouter);
app.use('/api/admin', adminRouter); // 
app.use('/api/accruals', accrualRouter); // 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log('Error occured: ', error);
res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} ${process.env.NODE_ENV}`);
});
