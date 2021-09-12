  
INSERT into department (name) VALUES ('Sales');
INSERT into department (name) VALUES ('Receptionist');
INSERT into department (name) VALUES ('Accounting');
INSERT into department (name) VALUES ('Human Resources');
INSERT into department (name) VALUES ('Legal');


INSERT into title (title, salary, department_id) VALUES ('Sales Lead', 200000, 1);
INSERT into title (title, salary, department_id) VALUES ('Salesperson', 100000, 1);
INSERT into title (title, salary, department_id) VALUES ('Receptionist', 60000, 2);
INSERT into title (title, salary, department_id) VALUES ('Accountant', 130000, 3);
INSERT into title (title, salary, department_id) VALUES ('Lawyer', 200000, 5);
INSERT into title (title, salary, department_id) VALUES ('HR Rep', 125000, 4);

 
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES('Kyle', 'Kilmartin', 1, NULL);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES('Mike', 'Wazawski', 2, 1);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES('Christian', 'Craig', 2, 1);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES ('Samantha', 'Trully', 3, NUll);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES ('Tammy', 'Fritz', 3, 4);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES  ('Landon', 'Currier', 5, NULL);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES ('Amy', 'Tiddles', 6, NULL);
INSERT into employee (first_name, last_name, title_id, manager_id) VALUES ('Tom', 'Riddle', 4, 6);
