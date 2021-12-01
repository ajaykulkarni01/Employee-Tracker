const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// a splash screen in text console with logo from ASCII characters.
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
},
console.log('Connected to the company_employees_db database...\n')
);

inquirer_menu();

function inquirer_menu() {
    inquirer.prompt([{
        type: "list",
        message: "Welcome to the SQL Employee-Trakcer application. Select the following options to plan and organize your work structure.",
        name: "menu",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
            "Exit"
        ]
    }])

    .then(function(data) {
        if (data.menu === "View All Departments") return viewAllDepartments();
        if (data.menu === "View All Roles") return viewAllRoles();
        if (data.menu === "View All Employees") return viewAllEmployees();
        if (data.menu === "Add A Department") return addDepartment();
        if (data.menu === "Add A Role") return addRole();
        if (data.menu === "Add An Employee") return addEmployee();
        if (data.menu === "Update An Employee Role") return updateEmpRole();
        if (data.menu === "Exit Application") return exit();
        console.log("\n :: Application has stopped  ::\n");
    })
};

// View All Departments
async function viewAllDepartments() {
    db.query('SELECT department.id AS "Department ID", department.name AS "Department Name" from department', function(err, results) {
        if (err) throw err;
        console.log("\n:: Viewing All Deparment Information ::\n")
        console.table(results); 
        inquirer_menu();      
    });
    
};

// View All Roles
async function viewAllRoles() {
    db.query('SELECT role.id AS "Role ID", role.title AS "Role", role.salary AS "Annual Salary", department.name AS Department FROM role JOIN department ON department.id = role.department_id', function(err, results) {
        if (err) throw err;
        console.log("\n:: Viewing All Roles Information ::\n")
        console.table(results);  
        inquirer_menu();     
    });

};

// View All Employees
async function viewAllEmployees() {
    db.query('SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Role Title", role.salary AS "Annual Salary", department.name AS "Department Name", concat(manager.first_name, " " , manager.last_name) AS "Manager Name" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id  ORDER BY employee.id', function(err, results) {
        if (err) throw err;
        console.log("\n:: Viewing All Employees Information ::\n")
        console.table(results);  
        inquirer_menu();     
    });

};

//Add a new department
function addDepartment() {
    // console.log("Add a new department function started")
    inquirer.prompt([{
        type: "input",
        name: "newDPName",
        message: "What is the name for your new Department?"
    }]).then(answers => {
        db.query('INSERT INTO department(name) VALUES (?)', [answers.newDPName], (err, results) => {
            if (err) throw err;
            console.log("\n:: A new department has been successfully added! :: \n")
            inquirer_menu();
        })
    })
};

// Add new Role
function addRole() {
    // console.log("Add a new role function started")
    db.promise().query('SELECT department.id, department.name FROM department')
        .then(([rows]) => {
            let currentDpNames = rows
            let dpChoices = currentDpNames.map(({ id, name }) => ({
                name: name,
                value: id
            }))

            inquirer.prompt([{
                    type: "input",
                    name: "title",
                    message: "What is the title of the new role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for the new role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "What department does this role belong too?",
                    choices: dpChoices
                },
            ]).then(answers => {
                db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);', [answers.title, answers.salary, answers.department_id], (err, results) => {
                    if (err) throw err;
                    console.log("\n:: New role has been successfully added! :: \n")
                    inquirer_menu();
                })
            })
        })
};


//Add a new employee 
function addEmployee() {
    db.promise().query('SELECT role.id, role.title FROM role')
        //using the role.id and role.title from role table to pull data. 
        .then(([rows]) => {
            
            let currentRole = rows
        
            let roleChoices = currentRole.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            db.promise().query('SELECT employee.id,  concat(employee.first_name," ",employee.last_name) AS Employee FROM employee')
                .then(([rows]) => {
                    let currentEmployee = rows
                    let manager = currentEmployee.map(({ id, Employee }) => ({
                        value: id,
                        name: Employee
                    }));


                    inquirer.prompt([{
                            type: "input",
                            name: "first_name",
                            message: "What is the first name of the employee?"
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "What is the last name of the employee?"
                        },
                        {
                            type: "list",
                            name: "role_id",
                            message: "What role will this employee be part of?",
                            choices: roleChoices
                        },
                        {
                            type: "list",
                            name: "manager_id",
                            message: "Who will be this employees manager?",
                            choices: manager
                        }
                    ]).then(answers => {
                        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, results) => {
                            // console.log(results)
                            if (err) throw err;
                            console.log("\n:: New employee has been added! ::\n")
                            inquirer_menu();
                        })
                    })
                })
        })
};

//Update An Employee Role

function updateEmpRole() {
    // console.log("Updating employee information")
    db.promise().query('SELECT employee.id, concat(employee.first_name, " ", employee.last_name) AS Employee from employee')
        .then(([rows]) => {
            // console.log(" employee updating", rows)
            let whichEmployee = rows
            let selectEmployee = whichEmployee.map(({ id, Employee }) => ({
                value: id,
                name: Employee
            }));

            //select the role.title for upate. 
            db.promise().query('SELECT role.id, role.title AS "Role" from role')
                .then(([rows]) => {
                    let whatRole = rows
                    let updatedRole = whatRole.map(({ id, Role }) => ({
                        value: id,
                        name: Role
                    }));

                    inquirer.prompt([{
                            type: "list",
                            name: "employee_pick",
                            message: "Which employee would you like to update?",
                            choices: selectEmployee
                        },
                        {
                            type: "list",
                            name: "new_role",
                            message: "What role will this employee being changing too?",
                            choices: updatedRole
                        }
                    ]).then(answers => {
                        db.query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [answers.new_role, answers.employee_pick], (err, results) => {
                            if (err) throw err;
                            console.log("\n:: The details of the employee has been updated! ::\n")
                            inquirer_menu();
                        })
                    })
                })
        })
};
module.exports = inquirer_menu;