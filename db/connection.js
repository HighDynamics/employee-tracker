const mysql = require('mysql2/promise');

// connect to database
const db = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker',
  },
  console.log('Connected to the employee-tracker database.')
);

module.exports = db;
