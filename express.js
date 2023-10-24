const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize the express application
const app = express();
app.use(bodyParser.json());

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Middleware for parsing JSON
app.use(express.json());

// MySQL Database pool connection
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
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
    'INSERT INTO users(firstName, lastName, username, password, location) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, username, password, location],
    (err, results) => {
      if (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: err.message });  // Send 500 status for server errors
        return;
      }

      // Success response
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  );
});

//User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user data from the database
    pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error fetching user:', err.message);
          res.status(500).json({ error: err.message });
          return;
        }

        // Check if the user exists
        if (results.length === 0) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }

        // Compare the plain text password
        const user = results[0];
        if (password !== user.password) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }

        // If authentication is successful, you can generate a JWT token
        // and return it to the client for session management
        // For now, we'll just send a success message
        res.status(200).json({ message: 'Login successful' });
      }
    );
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Server listening on port 3001 or the environment's specified port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
