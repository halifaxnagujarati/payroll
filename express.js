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

// Add Member endpoint
app.post('/api/addMember', async (req, res) => {
  try {
    const { memberName } = req.body;

    // Insert the member's name into the 'members' table
    pool.execute(
      'INSERT INTO members (memberNames) VALUES (?)',
      [memberName],
      (err, results) => {
        if (err) {
          console.error('Error adding member:', err.message);
          res.status(500).json({ error: err.message });
          return;
        }

        // Success response
        console.log('Member added successfully');
        res.status(200).json({ message: 'Member added successfully' });
      }
    );
  } catch (error) {
    console.error('Error adding member:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//fetch all members endpoint
app.get('/api/allMembers', async (req, res) => {
  try {
    // Retrieve all members from the 'members' table
    pool.query('SELECT * FROM members', (err, results) => {
      if (err) {
        console.error('Error fetching members:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }

      // Send the list of members as JSON
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching members:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//delete member endpoint
app.delete('/api/deleteMember/:id', async (req, res) => {
  try {
    const memberID = req.params.id;

    // Delete the member with the specified ID from the 'members' table
    pool.execute('DELETE FROM members WHERE memberID = ?', [memberID], (err, results) => {
      if (err) {
        console.error('Error deleting member:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }

      // Success response
      console.log('Member deleted successfully');
      res.status(200).json({ message: 'Member deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting member:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//delete staff endpoint
app.delete('/api/deleteStaff/:id', async (req, res) => {
  try {
    const empID = req.params.id;

    // Delete the member with the specified ID from the 'users' table
    pool.execute('DELETE FROM users WHERE empID = ?', [empID], (err, results) => {
      if (err) {
        console.error('Error deleting staff:', err.message);
        res.status(500).json({ error: 'Error deleting staff' });
        return;
      }

      // Check if any rows were affected (if no rows were deleted, empID might be invalid)
      if (results.affectedRows === 0) {
        console.error('No staff member found with empID:', empID);
        res.status(404).json({ error: 'Staff member not found' });
        return;
      }
      if (!empID || isNaN(empID)) {
        res.status(400).json({ error: 'Invalid empID' });
        return;
      }

      // Success response
      console.log('Staff deleted successfully');
      res.status(200).json({ message: 'Staff deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting staff:', error.message);
    res.status(500).json({ error: 'Error deleting staff' });
  }
});

app.post('/api/submitTimesheet', (req, res) =>{
  console.log('Received data:', req.body);
  
  const {week, dayWorked, startTime, endTime, totalHours, hourType, memberSupported, regular, teamLeadRegular, teamLeadSleep, nightAwake, nightSleep, sick, sickNightSleep, vacation, vacationNightSleep} = 

  pool.execute(
    'INSERT INTO timesheets(week, dayWorked, startTime, endTime, totalHours, hourType, memberSupported, regular, teamLeadRegular, teamLeadSleep, nightAwake, nightSleep, sick, sickNightSleep, vacation, vacationNightSleep) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [week, dayWorked, startTime, endTime, totalHours, hourType, memberSupported, regular, teamLeadRegular, teamLeadSleep, nightAwake, nightSleep, sick, sickNightSleep, vacation, vacationNightSleep],
    (err, results) => {
      if (err) {
        console.error('Error entrying timesheet data:', err.message);
        res.status(500).json({error:err.message});
        return;
      }

      console.log('Timesheet submitted successfully');
      res.status(200).json({message:'Timesheet submitted successfully'});
    }
  )
});

//fetch all staff endpoint
app.get('/api/allStaff', async (req, res) => {
  try {
    // Retrieve all staff members from the 'users' table
    pool.query('SELECT firstName, lastName, location FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching staff members:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      // Send the list of staff members as JSON
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching staff members:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Server listening on port 3001 or the environment's specified port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
