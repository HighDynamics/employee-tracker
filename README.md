# Employee-Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Organize your team with a relational database.

- Add and delete departments, roles, and employees
- Update employees
- View department budgets, all roles, and all employees

## Table of Contents

1. [Installation](#Installation)

2. [Usage](#Usage)

3. [Questions](#Questions)

4. [License](#License)

## Installation

Install Packages:

    npm install

Update `connection.js` with mySQL credentials:

    const db = mysql.createPool({
    host: 'localhost',
    user: <your-user-name>,
    password: <your-password>,
    database: 'employee_tracker',
    },

SQL statement:

    CREATE DATABASE employee_tracker

## Usage

`node index.js` to run from the command line. Follow the prompts to interact with the database.

Walkthrough video: [Employee-Tracker Walkthrough](https://drive.google.com/file/d/10IUVRW9Gv0N-HvKzap3UentKTJfYuCOh/view?usp=sharing)

## Questions

GitHub profile: [HighDynamics](https://github.com/HighDynamics)  
Reach out with additional questions at <HighDynamics@gmail.com>

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
