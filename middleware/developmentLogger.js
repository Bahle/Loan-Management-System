const developmentLogger = (req, res, next) => {
  if (process.env.NODE_ENV.startsWith('development')) {
    const { method, originalUrl } = req;
    console.log(`[Development Logger] Route: ${originalUrl} | Method: ${method}`);

    const statusCode = res.statusCode;
    // const messages = data && data.message ? data.message : '';
    console.log(`[Development Logger] Response Status Code: ${statusCode}`);

    // res.send();
  } else console.log('production?' + (process.env.NODE_ENV) + '.');
  next();
};

module.exports = developmentLogger;