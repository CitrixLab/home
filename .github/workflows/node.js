// Import the express library
const express = require('express');
const app = express();
const path = require('path');

// Define a port for your server
const port = process.env.PORT || 3000;

// Serve your static files (HTML, JS, CSS) from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
