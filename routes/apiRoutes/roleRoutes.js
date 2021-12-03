const db = require('../../db/connection');
const router = require('express').Router();

// GET all roles (job title, role id, department, salary)
router.get('/roles', (req, res) => {
  const sql = `SELECT r.id, r.title, r.salary, departments.name
              AS department
              FROM roles r
              LEFT JOIN departments
              ON r.department_id = departments.id
              `;

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
