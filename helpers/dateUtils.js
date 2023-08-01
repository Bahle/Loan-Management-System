// utils/dateUtils.js

// Helper function to get a date representing X days ago
const getXDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Function to get a date representing 3 days ago
const threeDaysAgo = () => getXDaysAgo(3);

// Function to get a date representing 7 days ago
const sevenDaysAgo = () => getXDaysAgo(7);

module.exports = {
  threeDaysAgo,
  sevenDaysAgo
};
