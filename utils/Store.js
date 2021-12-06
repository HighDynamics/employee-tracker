const db = require('../db/connection');

class Store {
  async getAllDepartments() {
    const sql = `SELECT * FROM departments`;

    const data = await db
      .query(sql)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async addDepartment(department) {
    const sql = `INSERT INTO departments (name)
                VALUES (?)`;

    const data = db
      .query(sql, department)
      .then(([rows]) => rows)
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async getAllRoles() {
    const sql = `SELECT r.id, r.title, r.salary, departments.name
                AS department
                FROM roles r
                LEFT JOIN departments
                ON r.department_id = departments.id
                `;

    const data = await db
      .query(sql)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async addRole({ title, salary, department_id }) {
    const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?,?,?)`;

    const params = [title, salary, department_id];
    const data = db
      .query(sql, params)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async getAllEmployees() {
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
                ON e.manager_id = m.id
                ORDER BY departments.name`;

    const data = await db
      .query(sql)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async getEmployeeById(id) {
    const sql = `SELECT * FROM employees
                WHERE employees.id = ?`;

    const data = await db
      .query(sql, id)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async updateEmployee({ id, first_name, last_name, role_id, manager_id }) {
    if (manager_id === 'NONE') {
      manager_id = null;
    }

    const sql = `UPDATE employees
                SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?
                WHERE id = ?`;

    const params = [first_name, last_name, role_id, manager_id, id];

    const data = await db
      .query(sql, params)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }

  async addEmployee({ first_name, last_name, role_id, manager_id }) {
    if (manager_id === 'NONE') {
      manager_id = null;
    }

    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)
    `;

    const params = [first_name, last_name, role_id, manager_id];

    const data = await db
      .query(sql, params)
      .then(([rows]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });

    return data;
  }
}

module.exports = Store;
