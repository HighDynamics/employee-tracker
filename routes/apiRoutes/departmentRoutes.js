const db = require('../../db/connection');
const router = require('express').Router();

// GET all departments (names, id)
router.get('/departments', (req, res) => {
  const sql = `SELECT * FROM departments`;

  db.query(sql)
    .then(([rows]) => {
      res.json({
        message: 'success',
        data: rows,
      });
    })
    .catch((err) => {
      throw error;
    });
});

module.exports = router;
