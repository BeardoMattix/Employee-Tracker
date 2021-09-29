const mysql = require("mysql2");
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
  // startPrompt();
});

module.exports = connection;
