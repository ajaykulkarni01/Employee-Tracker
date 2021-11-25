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
(2, "Sales Manager", 100000, 1),
(3, "Content Creator", 50000, 2),
(4, "Marketing Manager", 250000, 2),
(5, "Product Developer", 175000, 3),
(6, "Chief Science Officer", 275000, 3),
(7, "Accountant", 100000, 4),
(8, "Chief Finance Officer", 400000, 4),
(9, "Software Engineer", 90000, 5),
(10, "VP of Technology", 390000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "John", "Doe", 1, null),
(2, "Ryan", "Reynolds", 3, null),
(3, "Joshua", "Small", 5, null),
(4, "Maggie", "Sampson", 2, 1),
(5, "George", "Clooney", 4, 1),
(6, "James", "Brown", 6, 1),
(7, "Tom", "Allen", 8, 2),
(8, "Sebatian", "Arrazola", 10, 2),
(9, "Jimena", "Alvarez", 1, 2),
(10, "Maria", "Pulido", 3, 3),
(11, "Guillermo", "Arrazola", 5, 3),
(12, "Gaby", "Arrazola", 7, 3),
(13, "David", "Arrazola", 9, 4),
(14, "Nock", "Arrazola", 2, 4),
(15, "Nill", "Armstrong", 4, 4),
(16, "Jully", "Robe", 6, 5),
(17, "Cindy", "Heathcote", 8, 5),
(18, "Thyrone", "Wilson", 10, 5);


