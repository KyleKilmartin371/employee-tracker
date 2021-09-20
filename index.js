const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');

//startup function
function app() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'Please select an option from the menu',
                choices: [
                    'View Departments',
                    'Add Department',
                    'Update Employee Title',
                    'View Job Titles',
                    'Add Job Title',
                    'View Employees',
                    'Add Employee',
                    'Update Employee Title',
                    'Remove Employee',
                    'Exit',
                ],
                validate: mainMenu => {
                    if (mainMenu) {
                        return true;
                    } else {
                        console.log('Please make a selection!');
                        return false;
                    }
                },
            },
        ])
        // Call function based on menu selection
        .then(function ({ mainMenu }) {
            switch (mainMenu) {
                case 'View Departments':
                    departmentView();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'View Job Titles':
                    titleView();
                    break;

                case 'Add Job Title':
                    addTitle();
                    break;

                case 'View Employees':
                    employeeView();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Title':
                    updateRole();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
}

//department view
function departmentView() {
    const query = 'SELECT * FROM department';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        app();
    });
}

// Add departments
function addDepartment() {
    inquirer
      .prompt({
        type: 'input',
        message: 'What department would you like to add?',
        name: 'department',
      })
      .then(function (res) {
        const department = res.department;
        const query = `INSERT INTO department (name) VALUES("${department}")`;
        db.query(query, function (err, res) {
          if (err) throw err;
          console.log(`You've successfully added ${department}`);
          app();
        });
      });
  }

  // Title View
function titleView() {
    const query = 'SELECT * FROM title';
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      app();
    });
  }
  
  // Add Title
function addTitle() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the job title you want to add?',
          name: 'title',
        },
        {
          type: 'input',
          message: 'What is the salary for this position?',
          name: 'salary',
        },
        {
          type: 'input',
          message: 'What is the department ID for this position?',
          name: 'departmentID',
        },
      ])
      .then(function (res) {
        const title = res.title;
        const salary = res.salary;
        const departmentID = res.departmentID;
        const query = `INSERT INTO title (title, salary, department_id) VALUE("${title}", "${salary}", "${departmentID}")`;
        db.query(query, function (err, res) {
          if (err) throw err;
          console.log(`You've successfully added ${title}`);
          app();
        });
      });
  }

  // Employee View
  function employeeView() {
    db.query(
      'SELECT * FROM employee',
      function (err, res) {
        if (err) throw err;
        console.table(res);
        app();
      }
    );
  }

  // Add Employee
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: "What is the employee's first name?",
          name: 'firstName',
        },
        {
          type: 'input',
          message: "What is the employee's last name?",
          name: 'lastName',
        },
        {
          type: 'input',
          message: "What is the employee's Job Title ID?",
          name: 'titleID',
        },
        {
          type: 'input',
          message: "What is the employee's manager ID?",
          name: 'managerID',
        },
      ])
      .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const titleID = res.titleID;
        const managerID = res.managerID;
        const query = `INSERT INTO employee (first_name, last_name, title_id, manager_id) VALUE("${firstName}", "${lastName}", "${titleID}", "${managerID}")`;
        db.query(query, function (err, res) {
          if (err) throw err;
          console.log(`${firstName} ${lastName} has been added as an employee`);
          app();
        });
      });
  }


  //app startup
  app();