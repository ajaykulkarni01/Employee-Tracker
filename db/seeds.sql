USE company_employees_db;

INSERT INTO department (id, name)
VALUES
(1, "Sales"),
(2, "Marketing"),
(3, "Research & Development"),
(4, "Finance"),
(5, "Information Technology");

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "Sales Associate", 60000, 1),
(2, "Sales Manager", 80000, 1),
(3, "Content Creator", 65000, 2),
(4, "Marketing Manager", 90000, 2),
(5, "Product Developer", 75000, 3),
(6, "Chief Science Manager", 100000, 3),
(7, "Accountant", 62000, 4),
(8, "Chief Finance Manager", 120000, 4),
(9, "Software Engineer", 80000, 5),
(10, "Technology Manager", 115000, 5),
(11, "Managing Director", 150000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  
(1, "Thyrone", "Wilson", 11, NULL),
-- Sales Manager
(2, "Brigitte", "Sloot", 2, 1),
-- Marketing Manager
(3, "Maggie", "Sampson", 4, 1),
-- Chief Science OfManagerficer
(4, "Ryan", "Reynolds", 6, 1),
-- Chief Finance Manager
(5, "Sebatian", "Arrazola", 8, 1),
-- Technology Manager
(6, "Maria", "Pulido", 10, 1),
-- staff
(7, "Edward", "Doe", 1, 2),
(8, "Joshua", "Small", 3, 3),
(9, "George", "Clooney", 5, 4),
(10, "Tom", "Allen", 7, 5),
(11, "Jimena", "Alvarez", 9, 6),
(12, "Maria", "Pulido", 5, 4),
(13, "Guillermo", "Arrazola", 1, 2),
(14, "Gaby", "Arrazola", 3, 3),
(15, "David", "Arrazola", 5, 4),
(16, "Nick", "Arrazola", 7, 5),
(17, "Nill", "Armstrong", 9, 6),
(18, "Jully", "Robe", 1, 2),
(19, "Cindy", "Heathcote", 3, 3),
(20, "Rohan", "Bush", 3, 3);

-- view all departments
-- select department.id AS "Department ID", department.name AS "Department Name" from department;

-- view all roles
-- SELECT role.id AS "Role ID", role.title AS "Role", role.salary AS "AnnualSalary", department.name AS Department FROM role JOIN department ON department.id = role.department_id;

-- view all employees
-- SELECT employee.id AS "Employee ID", 
-- employee.first_name AS "First Name", 
-- employee.last_name AS "Last Name", 
-- employee.manager_id AS "Manager ID", 
-- role.title AS "Job Title", 
-- role.salary AS "Annual Salary", 
-- department.name AS "Department Name", 
-- concat(manager.first_name, " " , manager.last_name) AS "Manager Name" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id  ORDER BY employee.id