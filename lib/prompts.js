const inquirer = require('inquirer');
const cTable = require('console.table');

const promptUpdateEmployee = () => {
  // TODO: get employee list (id, name)
  // TODO: get manager list (id, name)
  const employeeList = [];
  const managerList = [];

  let employeeId = null;

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeName',
        message: 'Which employee would you like to update?',
        choices: employeeList.map((employee) => employee.name),
      },
    ])
    .then(({ employeeName }) => {
      employeeId = employeeList.find(
        (employee) => (employee.name = employeeName)
      ).id;

      // TODO: display employee record
      // TODO: display roles table

      return inquirer.prompt([
        {
          type: 'checkbox',
          name: 'updateChoices',
          message: `What field(s) would you like to update on ${employeeName}`,
          choices: ['First Name', 'Last Name', 'Role', 'Manager'],
        },
        {
          type: 'input',
          name: 'firstNameUpdate',
          message: "What is this employee's new first name?",
          when: updateChoices.includes('First Name'),
          validate: (firstNameUpdate) => {
            if (!firstNameUpdate) {
              console.log('Please enter a first name for this employee.');
              return false;
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'lastNameUpdate',
          message: "What is this employee's new last name?",
          when: updateChoices.includes('Last Name'),
          validate: (lastNameUpdate) => {
            if (!lastNameUpdate) {
              console.log('Please enter a last name for this employee.');
              return false;
            }
            return true;
          },
        },
        {
          type: 'number',
          name: 'roleUpdate',
          message: `What is the new role ID for ${employeeName}?`,
          when: updateChoices.includes('Role'),
          validate: (roleUpdate) => {
            if (!roleUpdate) {
              console.log(`Please enter a role ID for ${employeeName}`);
              return false;
            }
            return true;
          },
        },
        {
          type: 'list',
          name: 'managerUpdate',
          message: `Who is the new manager for ${employeeName}?`,
          when: updateChoices.includes('Manager'),
          choices: managerList.map((manager) => manager.name),
        },
      ]);
    })
    .then(({ updateChoices, ...answers }) => {
      // TODO: add update functions
      if (updateChoices.includes('First Name')) {
      }

      if (updateChoices.includes('Last Name')) {
      }

      if (updateChoices.includes('Role')) {
      }

      if (updateChoices.includes('Manager')) {
        const managerId = managerList.find(
          (manager) => manager.name === managerUpdate
        ).id;
      }

      console.log('Employee updated');
      // TODO: display employee record
      return promptStart();
    });
};

const promptAddEmployee = () => {
  // TODO: display employees table
  // TODO: display roles table
  // TODO: display managers table

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is this employees first name?',
        validate: (firstName) => {
          if (!firstName) {
            console.log('Please enter a first name for this employee.');
            return false;
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is this employees last name?',
        validate: (lastName) => {
          if (!lastName) {
            console.log('Please enter a last name for this employee.');
            return false;
          }
          return true;
        },
      },
      {
        type: 'number',
        name: 'roleId',
        message: 'What is the role ID for this employee?',
        validate: (roleId) => {
          if (!roleId) {
            console.log('Please enter a role ID for this employee.');
            return false;
          }
          return true;
        },
      },
      {
        type: 'number',
        name: 'managerId',
        message: "What is the manager's ID for this employee?",
        validate: (managerId) => {
          if (!managerId) {
            console.log('Please enter a manager ID for this employee.');
            return false;
          }
          return true;
        },
      },
    ])
    .then(({ firstName, lastName, roleId, managerId }) => {
      // TODO: add employee to table
      // TODO: display employees table
    });
};

const promptAddRole = () => {
  // TODO: display roles table
  // TODO: display departments table

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the job title for this role?',
        validate: (title) => {
          if (!title) {
            console.log('Please enter a title for this role.');
            return false;
          }
          return true;
        },
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: (salary) => {
          if (!salary) {
            console.log('Please enter a salary for this role.');
            return false;
          }
          return true;
        },
      },
      {
        type: 'number',
        name: 'departmentId',
        message: 'To which department ID does this role belong?',
        validate: (departmentId) => {
          if (!departmentId) {
            console.log('Please enter an ID for the department.');
            return false;
          }
          return true;
        },
      },
    ])
    .then(({ title, salary, departmentId }) => {
      // TODO: add role to table
      // TODO: display roles table
      return promptStart();
    });
};

const promptAddDepartment = () => {
  // TODO: display departments table

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
        validate: (departmentName) => {
          if (!departmentName) {
            console.log('Please enter a name for the department.');
            return false;
          }
          return true;
        },
      },
    ])
    .then(({ departmentName }) => {
      // TODO: add department to table
      // TODO: display updated departments table
      return promptStart();
    });
};

const promptStart = () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee',
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case 'View all departments':
          // TODO: display departments table
          return promptStart();
        case 'View all roles':
          // TODO: display roles table
          return promptStart();
        case 'View all employees':
          // TODO: display employees table
          return promptStart();
        case 'Add a department':
          return promptAddDepartment();
        case 'Add a role':
          return promptAddRole();
        case 'Add an employee':
          return promptAddEmployee();
        case 'Update an employee':
          // TODO: check for employees
          return promptUpdateEmployee();
        default:
          return promptStart();
      }
    });
};

module.exports = promptStart;
