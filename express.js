const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize the express application
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// MySQL Database pool connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ssgnsAdmin',
  password: 'ssgns2023',
  database: 'ssgns2023',
});

// POST endpoint for user registration
app.post('/api/register', (req, res) => {
  // Logging the received data for debugging
  console.log('Received data:', req.body);

  // Destructuring the request body
  const { firstName, lastName, username, password, location } = req.body;

  // Inserting data into MySQL database
  pool.execute(
    'INSERT INTO users (firstName, lastName, username, password, location) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, username, password, location],
    (err, results) => {
      if (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'User registration failed' });  // Send 500 status for server errors
        return;
      }

      // Success response
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  );
});

// Server listening on port 3000 or the environment's specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
