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
                    'View Job Titles',
                    'Add Job Title',
                    'View Employee',
                    'Add Employee',
                    'Update Employee',
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

                case 'View Employee':
                    employeeView();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee':
                    updateTitle();
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

  // Update Employee Information

function updateTitle() {
  const titleData = [];
  const titleNames = [];

  const employeeData = [];
  const employeeNames = [];

  getTitles()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        titleData.push(data[i]);
        titleNames.push(data[i].title);
      }

      getEmployee()
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            employeeData.push(data[i]);
            employeeNames.push(data[i].last_name);
          }
          updateEmployeeQuestions(
            titleData,
            titleNames,
            employeeData,
            employeeNames
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function updateEmployeeQuestions(
  titleData,
  titleNames,
  employeeData,
  employeeNames
) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeNames,
        pageSize: 12,
      },
      {
        type: 'list',
        name: 'update',
        message: 'What information would you like to update?',
        choices: [`Employee's title`,
                  // `Employee's manager`,
                  'Cancel'],
      },
    ])
    .then(answers => {
      let employeeId;
      for (let i = 0; i < employeeData.length; i++) {
        if (answers.employee === employeeData[i].last_name) {
          employeeId = employeeData[i].id;
        }
      }
      if (answers.update === `Employee's title`) {
        newTitle(employeeId, titleData, titleNames);
      } 
      else if (answers.update === `Employee's manager`) {
        employeeNames.push('No Manager');
        getManager(employeeId, employeeData, employeeNames);
      } else {
        app();
      }
    });
}

function newTitle(employeeId, titleData, titleNames) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'title',
        message: `What is the employee's new job title?`,
        choices: titleNames,
        pageSize: 12,
      },
    ])
    .then(answers => {
      let titleId;
      for (let i = 0; i < titleData.length; i++) {
        if (answers.title === titleData[i].title) {
          titleId = titleData[i].id;
        }
      }
      updateEmployeetitle(employeeId, titleId);
    });
}

function updateEmployeetitle(employeeId, titleId) {
  db.query(
    `UPDATE employee SET ? WHERE ?`,
    [
      {
        title_id: titleId,
      },
      {
        id: employeeId,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`You've successfully updated the employee's title`);
      app();
    }
  );
}


function getTitles() {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, title AS 'title' FROM title ORDER BY title`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

function getEmployee() {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, last_name FROM employee ORDER BY last_name`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}


  //app startup
  app();