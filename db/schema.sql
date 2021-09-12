
USE employee_trkr;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS title;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
id INTEGER  NOT Null auto_increment PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE title (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
id INTEGER NOT NULL auto_increment PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title_id INTEGER,
manager_id INTEGER,
  FOREIGN KEY (title_id) REFERENCES title(id),
  FOREIGN KEY (manager_id) REFERENCES title(id)
);
