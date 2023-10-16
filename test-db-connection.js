const mysql = require('mysql12');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'ssgnsAdmin',
  password: 'ssgns2023',
  database: 'ssgns2023',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
