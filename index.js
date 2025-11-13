// Import the http module
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Route for /about
  if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About Page\n');
  } 
  // Route for home or other paths
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Node.js server is running!\n');
  }
});

// Define the port number
const PORT = 3000;

// Start listening on the defined port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

