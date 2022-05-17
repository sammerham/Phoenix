# Phoenix API

Phoenix is an API that support CRUD-style operations on a number of entities and synchronize those changes with a mock traceability API codename “Leviathan”.  
- Employees (completed)
- Customers (TBD)
- Orders (TBD)

## Deployed Version
https://phoenixsam.herokuapp.com/

## Installation

Use the node package manager to install install all the dependencies.

```bash
npm install
```
## Starting Server 3001

```bash
node server.js
```
If you have nodemon installed:
```bash
nodemon server.js
```
## Testing
Tests are written using Jest and SuperTest, to run tests:
```bash
jest file name
```
## Getting Started
1- Install PostgreSQL on your machine.

## Download and install PostgreSQL

```bash
brew install postgres
```
## Start the PostgreSQL server automatically in the background

```bash
brew services start postgresql
```
###
2- Create two data bases one for app and the other one for testing
A-  
```bash
createdb phoenixdb
```
B- 
```bash
createdb phoenixdb_test
```
2 - Run data.sql file to create database, from your project directory run below command.
```bash
psql < data.sql 
```
<!-- 3- change name of .envSample file to .env and add your APIUser and APIKey. -->
###
4- 
Starting Server 3001

```bash
node server.js
```
If you have nodemon installed:
```bash
nodemon server.js
```
## Routes
#### /employees - GET request
### 
Get you a list of all employees in the DB
#### /employees/:id - GET request
### 
Get you an employee that matches this id in DB.
#### /employees/leviathan/:id - GET request
### 
Get you an employee that matches this leviathanid in DB.
#### /employees/ - POST request
### 
Add an employee to DB.
required fields are (firstName, lastName, telephone, role)
#### /employees/:id - PATCH request
### 
updates an employee with matching id.
required fields are (firstName, lastName, telephone, role)
#### /employees/leviathan/:id - PATCH request
### 
updates an employee with matching leviathanid.
required fields are (firstName, lastName, telephone, role)
#### /employees/:id - DELETE request
### 
Removes an employee with matching id.
#### /employees/leviathan/:id - DELETE request
### 
Removes an employee with matching leviathanid.
