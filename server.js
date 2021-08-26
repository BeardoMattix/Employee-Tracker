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
  password: "Finntroll1",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Now connected as ID" + connection.threadId);
  startPrompt();
});
// This initializes the Inquirer package.
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
// Function that allows the user to view all employees in the DB
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
// Function that shows all of the roles and the salaries associated with them.
function viewAllRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
// Function that allows the user to view all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function viewAllRoles() {
  connection.query(
    "SELECT role.id, role.title, role.salary FROM role;",
    (err, table) => {
      if (err) {
        console.log(err);
      }
      console.table(table);
      startPrompt();
    }
  );
}
// Function to add a role
function addRole() {
  connection.query(
    "SELECT role.title AS title, role.salary AS salary FROM role;",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}
// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

// Role queries for adding an employee
const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
  return roleArray;
}
const managersArray = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managersArray.push(res[i].first_name);
      }
    }
  );
  return managersArray;
}
// Function for adding an employee.
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
}

function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
      if(err) throw err;
      console.log(res);
      inquirer.prompt([
        {
          name: "lastname",
          type: "rawlist",
          choices: function() {
            let lastname = [];
            for(let i = 0; i < lastname.length; i++) {
              lastname.push(lastname[i].last_name);
            }
          }
        }
      ])
    }
  )
}
