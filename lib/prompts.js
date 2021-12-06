const inquirer = require('inquirer');
const cTable = require('console.table');

const Store = require('../utils/Store');
const store = new Store();

function surroundTable(string, table) {
  console.log('\n');
  console.log('==='.repeat(10));
  console.log(string);
  console.log('~~~'.repeat(10));
  console.table(table);
  console.log('==='.repeat(10));
}

async function getEmployeeList() {
  // get employee information
  const employeeArray = await store.getAllEmployees().then((data) => data);

  // map employees for inquirer choices
  const employeeList = employeeArray
    .sort((a, b) => {
      return a.id - b.id;
    })
    .map(
      (employee) =>
        employee.id + '. ' + employee.first_name + ' ' + employee.last_name
    );

  return employeeList;
}

const promptUpdateEmployee = async () => {
  const employeeList = await getEmployeeList();
  let employeeId = null;

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeList,
      },
    ])
    .then(async ({ employee }) => {
      // extract data from answer
      const employeeName = employee.split('. ')[1];
      employeeId = employee.split('. ')[0];

      // get tables
      const employeeTable = await store
        .getEmployeeById(employeeId)
        .then((table) => table);
      const rolesTable = await store.getAllRoles().then((table) => table);

      // display tables for reference
      surroundTable('Roles', rolesTable);
      surroundTable(employeeName, employeeTable);

      return inquirer.prompt([
        {
          type: 'checkbox',
          name: 'updateChoices',
          message: `What field(s) would you like to update on ${employeeName}?\n`,
          choices: ['First Name', 'Last Name', 'Role', 'Manager'],
        },
        {
          type: 'input',
          name: 'firstNameUpdate',
          message: "What is this employee's new first name?",
          when: ({ updateChoices }) => updateChoices.includes('First Name'),
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
          when: ({ updateChoices }) => updateChoices.includes('Last Name'),
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
          message: `What is the new role ID for this employee?`,
          when: ({ updateChoices }) => updateChoices.includes('Role'),
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
          message: `Who is the new manager for this employee?`,
          when: ({ updateChoices }) => updateChoices.includes('Manager'),
          choices: employeeList,
        },
      ]);
    })
    .then(
      async ({
        firstNameUpdate,
        lastNameUpdate,
        roleUpdate,
        managerUpdate,
      }) => {
        const originalEmployee = await store
          .getEmployeeById(employeeId)
          .then((data) => data);

        // conditionally build object
        const updatedEmployee = {
          id: employeeId,
          first_name: firstNameUpdate || originalEmployee[0].first_name,
          last_name: lastNameUpdate || originalEmployee[0].last_name,
          role_id: roleUpdate || originalEmployee[0].role_id,
          manager_id: managerUpdate || originalEmployee[0].manager_id,
        };

        // update record
        await store.updateEmployee(updatedEmployee).then((data) => data);

        // get and display updated record
        const updatedEmployeeRecord = await store
          .getEmployeeById(employeeId)
          .then((data) => data);
        surroundTable('Updated', updatedEmployeeRecord);

        return promptStart();
      }
    );
};

const promptAddEmployee = async () => {
  const employeeList = await getEmployeeList();

  // display roles table for reference
  const rolesTable = await store.getAllRoles().then((data) => data);
  surroundTable('Roles', rolesTable);

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
        type: 'list',
        name: 'manager',
        message: 'Who is the manager for this employee?',
        choices: employeeList,
      },
    ])
    .then(async ({ firstName, lastName, roleId, manager }) => {
      const managerId = manager.split('. ')[0];

      const employee = {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId,
      };

      // add employee to table
      await store.addEmployee(employee);

      // display employees table
      const employeesTable = await store.getAllEmployees().then((data) => data);

      surroundTable('Employees', employeesTable);
    });
};

const promptAddRole = async () => {
  const rolesTable = await store.getAllRoles().then((data) => data);
  const departmentsArray = await store.getAllDepartments().then((data) => data);

  // map departments for inquirer choices
  const departmentsList = departmentsArray.map(
    ({ id, name }) => `${id}. ${name}`
  );

  // display roles table
  surroundTable('Roles', rolesTable);

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
        type: 'list',
        name: 'departmentId',
        message: 'To which department ID does this role belong?',
        choices: departmentsList,
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

const quitPrompts = () => {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'isDone',
        message: 'Are you sure you want to quit?',
      },
    ])
    .then(({ isDone }) => {
      if (!isDone) {
        promptStart();
      }

      return;
    });
};

const promptStart = () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        pageSize: 8,
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee',
          'Quit',
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case 'View all departments':
          // display departments table
          store
            .getAllDepartments()
            .then((data) => {
              surroundTable('DEPARTMENTS', data);
            })
            .then((res) => {
              return promptStart();
            });
          break;
        case 'View all roles':
          // display roles table
          store
            .getAllRoles()
            .then((data) => {
              surroundTable('ROLES', data);
            })
            .then((res) => {
              return promptStart();
            });
          break;
        case 'View all employees':
          // display employees table
          store
            .getAllEmployees()
            .then((data) => {
              surroundTable('EMPLOYEES', data);
            })
            .then((res) => {
              return promptStart();
            });
          break;
        case 'Add a department':
          return promptAddDepartment();
        case 'Add a role':
          return promptAddRole();
        case 'Add an employee':
          return promptAddEmployee();
        case 'Update an employee':
          // TODO: check for employees
          return promptUpdateEmployee();
        case 'Quit':
          return quitPrompts();
        default:
          return promptStart();
      }
    });
};

module.exports = promptStart;
