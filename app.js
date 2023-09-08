const http = require('http');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/bfhl') {
    // Handle GET request
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ operation_code: 1 }));
  } else if (req.method === 'POST' && req.url === '/bfhl') {
    // Handle POST request
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      try {
        const requestData = JSON.parse(body);

        // Extract data from the request
        const { data } = requestData;

        // Construct user_id in the required format
        const user_id = 'john_doe_17091999';
        const email = 'john@xyz.com';
        const roll_number = 'ABCD123';

        // Separate numbers and alphabets from the data array
        const numbers = data.filter((item) => !isNaN(item));
        const alphabets = data.filter((item) => isNaN(item));

        // Find the highest alphabet in the array of alphabets
        const highestAlphabet = alphabets.reduce((highest, current) => {
          return current > highest ? current : highest;
        });

        // Prepare the response object
        const response = {
          is_success: true,
          user_id,
          email,
          roll_number,
          numbers,
          alphabets,
          highest_alphabet: [highestAlphabet],
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON data' }));
      }
    });
  } else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Define the port for your API
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
