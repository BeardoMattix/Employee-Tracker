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
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department AS Department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;",
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
// Function for showing the roles and departments
function viewAllRoles() {
  connection.query(
    "SELECT role.id, role.title, role.salary , role.department_id AS department FROM role JOIN department ON role.department_id = department.id;",
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
// Function for updating the role of an employee
const updateEmployee = () => {
  connection.query("SELECT employee.last_name, employee.role_id FROM employee;", function(err, res) {
      if (err) throw err
      console.log(res)
      inquirer.prompt([{
              name: "lastName",
              type: "rawlist",
              choices: function() {
                  let lastName = [];
                  for (var i = 0; i < res.length; i++) {
                      lastName.push(res[i].last_name);
                  }
                  return lastName;
              },
              message: "What is the Employee's last name? ",
          },
          {
              name: "role",
              type: "rawlist",
              message: "What is the Employees new title? ",
              choices: selectRole()
          },
      ]).then(function(val) {
          const roleId = selectRole().indexOf(val.role) + 1;
          connection.query("", {
                  last_name: val.lastName

              }, {
                  role_id: roleId

              },
              function(err) {
                  if (err) throw err
                  console.table(val)
                  startPrompt()
              })
      });
  });
};