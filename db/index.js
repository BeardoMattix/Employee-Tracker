// Sequel statements to be exported
const queries = {
  allDept: "SELECT * FROM department;",
  allEmp:
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department AS Department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;",
  allRoles:
    "SELECT role.id, role.title, role.salary , role.department_id AS department FROM role JOIN department ON role.department_id = department.id;",
  addRole: "SELECT role.title AS title, role.salary AS salary FROM role;",
  updateEmp:
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
};
// const allDept = "SELECT * FROM department;";

module.exports = queries;
