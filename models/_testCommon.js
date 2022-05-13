"use strict";
const db = require("../db");


async function commonBeforeAll() {

  // clearning employee table
  await db.query("DELETE FROM employee");
 

  // seeding employee table
await db.query(`
    INSERT INTO employee ( firstname, lastname, email, telephone, role, leviathanid )
    VALUES  ('d1', 'test1', 'd1@test.com', '111-111-1111', 'driver', 'leviathantest1'),
            ('d2', 'test2', 'd2@test.com', '222-222-2222', 'admin', 'leviathantest2'),
            ('d3', 'test3', 'd3@test.com', '333-333-3333', 'cashier', 'leviathantest3')
    RETURNING id`);
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
};