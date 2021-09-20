const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

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
                    viewEmployees();
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

//department function
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

  // View Title
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


  //app startup
  app();