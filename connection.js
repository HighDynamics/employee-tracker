const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'election',
  },
  console.log('Connected to the employee-tracker database.')
);

module.exports = db;
