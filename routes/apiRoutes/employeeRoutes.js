const db = require('../../db/connection');
const router = require('express').Router();

// GET all employees (id, first name, last name, job title, department, salary, manager)
router.get('/employees', (req, res) => {
  const sql = `SELECT e.id, e.first_name, e.last_name, 
              roles.title AS job_title, 
              departments.name AS department, 
              roles.salary AS salary,
              CONCAT(m.last_name, ', ', m.first_name) AS manager
              FROM employees e
              LEFT JOIN roles
              ON e.role_id = roles.id
              LEFT JOIN departments
              ON roles.department_id = departments.id
              LEFT JOIN employees m
              ON e.manager_id = m.id`;

  db.query(sql)
    .then(([rows]) => {
      res.json({
        message: 'success',
        data: rows,
      });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
