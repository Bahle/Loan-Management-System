const axios = require('axios');
const crypto = require('crypto');

const date = new Date().toISOString(); // Get the current date and time in ISO 8601 format
const secret = 'jKgK4fdJtecdfu2Oj3c0LoW7A8EPHjd'; // Replace this with your actual secret key

// =================
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');

const formattedDate = `${year}${month}${day}-${hours}`;
// =================

const hmac = crypto.createHmac('sha256', Buffer.from(secret, 'base64'));
const auth = hmac.update(date).digest('base64');

console.log('Date:', date);
console.log('Auth:', auth);

const url = 'http://splitz.dedicated.co.za/sms/bulk_api.php';
const msisdn = '26657047976';
// const campaign = 'your_campaign_value';
const company = 'TEST';
const campaign = 'Redemption';
const text = 'Testing API message';

const requestData = {
  msisdn,
  company,
  // campaign,
  text,
  secret,
  date,
  auth
};

// Make the HTTP POST request
axios
  .get(url, { params: requestData })
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
