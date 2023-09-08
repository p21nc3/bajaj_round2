const http = require('http');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL to determine the endpoint and HTTP method
  const { pathname } = url.parse(req.url);

  if (req.method === 'GET' && pathname === '/api/operation_code') {
    // Handle GET request for /api/operation_code
    const operationCode = '12345';
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ operation_code: operationCode }));
  } else if (req.method === 'POST' && pathname === '/api/user') {
    // Handle POST request for /api/user
    let requestBody = '';
    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', () => {
      try {
        const requestData = JSON.parse(requestBody);

        // Extract data from the JSON request body
        const {
          status,
          user_id,
          college_email_id,
          college_roll_number,
          numbers,
          alphabets,
        } = requestData;

        // Calculate the highest alphabet in the input array of alphabets
        const highestAlphabet = Math.max(...alphabets.map((char) => char.charCodeAt(0)));

        // Create a response object
        const response = {
          status,
          user_id,
          college_email_id,
          college_roll_number,
          numbers,
          alphabets,
          highest_alphabet: String.fromCharCode(highestAlphabet), // Convert ASCII code back to character
        };

        // Send the response as JSON
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } catch (error) {
        res.statusCode = 400;
        res.end('Bad Request');
      }
    });
  } else {
    // Handle other routes or methods
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
