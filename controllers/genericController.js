const axios = require('axios');

exports.proxyRequest = async (req, res) => {
  try {
    const token = req.headers.authorization || '';
    
    // Convert /api/customers to /Customers
    // Example: originalUrl is /api/customers -> we want /Customers
    // Assuming BASE_URL is something like https://fin-face.com/connectadmin/api
    const apiPath = req.originalUrl.replace('/api', '');
    
    const config = {
      method: req.method,
      url: `${process.env.BASE_URL}${apiPath}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };

    // Attach body for methods that allow it
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      config.data = req.body;
    }

    const response = await axios(config);
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error(`Pipeline Error [${req.method} ${req.originalUrl}]:`, error.response?.data || error.message);
    
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Internal Server Error", error: error.message }
    );
  }
};
