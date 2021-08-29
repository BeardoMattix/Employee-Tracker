

# <p align="center">Welcome to my Employee Tracker!</p> 
## <p align="center">A command line application for managing an employee database.</p>

## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Challenges](#challenges)
  * [Usage](#usage)
  * [License](#license)
  * [Questions](#questions)

## Description

This application allows the user to manage an employee database in the command line. The application takes user input and updates and employee database. Users can view all the employees in the database, view all departments, view all roles. Users can also add employees, departments, roles, or update an existing employee's role. The application uses Express, MySQL, and NODE.js to dynamically respond to user input and update the database.  
 
## Technologies
* JavaScript
* Node.js
* Express
* SQL
* Inquirer npm
* Console.Table npm
* MySQL2 npm


## Functionality
The application uses the Inquirer npm to gather information from the user, and takes the user responses and either returns information from specific tables in the database, or updates tables in the database. the Console.Table npm is used to return information from the database as a table in the command line. When the user installs the application, they run 'npm start' in the command line to start the app. 


## Demo
https://user-images.githubusercontent.com/82903201/131254587-d381de2e-1805-46cf-96a0-5cd15799e74c.mp4


## Challenges

* Understanding the SQL syntax and implementing it in the code.
* Creating query statements and then testing them in MySQL workbench.
* There are a lot if files to keep track of. 

## Usage
* Use this app to keep track of employees.
* Use this app to understand query statements in MySQL.
* Use this app to see how express and SQL work together. 

## Installation
* Install Node.js
* Enter 'npm init' in command line
* Enter 'npm i' in the command line to install dependencies
* Enter 'node start' in the command line to run the application

## Future Development
* Update the application to run using Sequelize instead of hard coding query statements.
* Use Dotenv npm and set up a connection file to handle access to server. 

## Questions
* Take a look at my GitHub profile to see other projects: 
[My GitHub Profile](https://github.com/BeardoMattix)
* If you have any questions, please reach out via email: christopher.mattix@gmail.com

## License
[MIT](https://opensource.org/licenses/MIT)

![badge](https://img.shields.io/static/v1?label=License&message=MIT&color=success)