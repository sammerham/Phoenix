"use strict";

const db = require("../db");
const Employee = require("../models/employee");

const testEmployeesIds = [];
const testEmployeesLeviathanIds = [];
async function commonBeforeAll() {
// Clear employee table
await db.query("DELETE FROM employee");
 
// adding employees
  const emp1 = await Employee.addEmployee(
    'd1',
    'test1',
    'newEmployee1@test.com',
    'leviId1',
    '111-111-1111',
    'driver1'
  );
  const emp2 = await Employee.addEmployee(
    'd2',
    'test2',
    'newEmployee2@test.com',
    'leviId2',
    '222-222-2222',
    'driver2'
  );
  const emp3 = await Employee.addEmployee(
    'd3',
    'test3',
    'newEmployee3@test.com',
    'leviId3',
    '333-333-3333',
    'driver3'
  );

  testEmployeesIds[0] = emp1.id;
  testEmployeesIds[1] = emp2.id;
  testEmployeesIds[2] = emp3.id;
  testEmployeesLeviathanIds[0] = emp1.leviathanid;
  testEmployeesLeviathanIds[1] = emp1.leviathanid;
  testEmployeesLeviathanIds[2] = emp1.leviathanid;
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEmployeesIds,
  testEmployeesLeviathanIds
};