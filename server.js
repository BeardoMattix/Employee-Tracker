// Imports the inquirer npm package
const inquirer = require("inquirer");
// Imports the mysql package
const mysql = require("mysql2");
// Importing the console table package
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Now connected as ID" + connection.threadId);
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what do you want to do?",
        name: "choice",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Update an employee",
          "Add an employee",
          "Add a role",
          "Add a department",
        ],
      },
    ])
    .then(function (value) {
      switch (value.choice) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Update an employee":
          updateEmployee();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add a department":
          addDepartment();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
