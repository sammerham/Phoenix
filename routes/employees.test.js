"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");
const Employee = require("../models/employee");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEmployeesIds,
  testEmployeesLeviathanIds
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** GET /employees */
describe("GET /employees", () => { 
  const employees =  [
        {
          id: expect.any(Number),
          firstname: 'd1',
          lastname: 'test1',
          email: 'newEmployee1@test.com',
          leviathanid: 'leviId1',
          telephone: '111-111-1111',
          role: 'driver1'
        },
        {
          id: expect.any(Number),
          firstname: 'd2',
          lastname: 'test2',
          email: 'newEmployee2@test.com',
          leviathanid: 'leviId2',
          telephone: '222-222-2222',
          role: 'driver2'
        },
        {
          id: expect.any(Number),
          firstname: 'd3',
          lastname: 'test3',
          email: 'newEmployee3@test.com',
          leviathanid: 'leviId3',
          telephone: '333-333-3333',
          role: 'driver3'
        }
      ]


  test("works", async () => {
    const resp = await request(app)
      .get("/employees");
    expect(resp.body).toEqual({employees});
  });
  
});

/************************************** GET /employees/:id */
describe("GET /employees/:id", () => { 

  test("works", async () => {
    const resp = await request(app)
      .get(`/employees/${testEmployeesIds[0]}`)
    
    expect(resp.body).toEqual({
      employee: {
        id: testEmployeesIds[0],
        firstname: 'd1',
        lastname: 'test1',
        email: 'newEmployee1@test.com',
        leviathanid: 'leviId1',
        telephone: '111-111-1111',
        role: 'driver1'
      }
    });
  });
  


  test("not found if employee not found", async () => {
    const resp = await request(app)
        .get(`/employee/99999`)
    expect(resp.statusCode).toEqual(404);
  });
});



/************************************** GET /employees/leviathanid/:id */
describe("GET /employees/leviathanid/:id", () => { 

  test("works", async () => {
    const resp = await request(app)
      .get(`/employees/leviathan/${testEmployeesLeviathanIds[0]}`)
    
    expect(resp.body).toEqual({
      employee: {
        id: testEmployeesIds[0],
        firstname: 'd1',
        lastname: 'test1',
        email: 'newEmployee1@test.com',
        leviathanid: testEmployeesLeviathanIds[0],
        telephone: '111-111-1111',
        role: 'driver1'
      }
    });
  });
  

  test("not found if employee not found", async () => {
    const resp = await request(app)
        .get(`/employee/leviathan/notfound`)
    expect(resp.statusCode).toEqual(404);
  });
});




/************************************** POST / employee */
describe("POST /employees", () => {
  test("works", async () => {
    const resp = await request(app)
      .post("/employees")
      .send(
        {
          firstName: "newEmpTest",
          lastName: "test1New",
          telephone: "925-000-4076",
          role :"driver"
        })
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.employee.firstname).toEqual("newEmpTest");
    expect(resp.body.employee.lastname).toEqual("test1New");
    expect(resp.body.employee.telephone).toEqual("925-000-4076");

  });

  
  test("bad request if missing data", async () => {
    const resp = await request(app)
      .post("/employees")
      .send({
        firstName: "newEmployee",
        lastName: "test1New",
      })
    expect(resp.statusCode).toEqual(400);
  });
  
test("bad request if invalid data", async () => {
  const resp = await request(app)
      .post("/employees")
        .send({
          firstName: "newemployee",
          lastName: "test1New",
          email: 8888
        })
    expect(resp.statusCode).toEqual(400);
});
});


/************************************** DELETE /employee/:id */

describe("DELETE /employee/:id", () => {
  
  test("works", async () => {
    const resp = await request(app)
      .delete(`/employees/${testEmployeesIds[0]}`)
    expect(resp.body).toEqual({  message: "Employee deleted!" });
  });


  test("not found if employee doesn't exist", async () => {
    const resp = await request(app)
      .delete(`/employees/90999`)
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** DELETE /employee/leviathan/:id */

describe("DELETE /employee/:id", () => {
  
  test("works", async () => {
    const resp = await request(app)
      .delete(`/employees/leviathan/${testEmployeesLeviathanIds[0]}`)
    expect(resp.body).toEqual({  message: "Employee deleted!" });
  });


  test("not found if employee doesn't exist", async () => {
    const resp = await request(app)
      .delete(`/employee/leviathan/notfound`)
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /employees/:id */

describe("PATCH /employees/:id", () => {
  test("works", async () => {
    const employee = {
        id: expect.any(Number),
        firstname: 'updated first Name',
        lastname: 'updated last Name',
        email: null,
        leviathanid: expect.any(String),
        telephone: '111-111-1111',
        role: 'updatedRole'
      }
    const resp = await request(app)
      .patch(`/employees/${testEmployeesIds[0]}`)
      .send({
        firstName: "updated first Name",
        lastName: "updated last Name",
        role: 'updatedRole',
        telephone:"111-111-1111"
        })
    expect(resp.body).toEqual({ employee });
  });



  test("not found if no such employee", async () => {
    const resp = await request(app)
      .patch(`/employees/99999`)
      .send({
        firstName: "updated first Name",
        lastName: "updated last Name",
        email: "updated@updated.com"
      })
    expect(resp.statusCode).toEqual(404);
  });
  
  test("bad request if invalid data", async () => {
    const resp = await request(app)
      .patch(`/employees/${testEmployeesIds[0]}`)
      .send({
        firstName: "updated first Name",
        lastName: 999,
      })
    expect(resp.statusCode).toEqual(400);
  });
});


/************************************** PATCH /employees/leviathan/:id */

describe("PATCH /employees/leviathan/:id", () => {
  test("works", async () => {
    const employee = {
        id: expect.any(Number),
        firstname: 'updated first Name',
        lastname: 'updated last Name',
        email: null,
        leviathanid: 'leviId1',
        telephone: '111-111-1111',
        role: 'updatedRole'
      }
    const resp = await request(app)
      .patch(`/employees/leviathan/${testEmployeesLeviathanIds[0]}`)
      .send({
        firstName: "updated first Name",
        lastName: "updated last Name",
        role: 'updatedRole',
        telephone:"111-111-1111"
        })
    expect(resp.body).toEqual({ employee });
  });



  test("not found if no such employee", async () => {
    const resp = await request(app)
      .patch(`/employees/leviathan/notfound`)
      .send({
        firstName: "updated first Name",
        lastName: "updated last Name",
        email: "updated@updated.com"
      })
    expect(resp.statusCode).toEqual(404);
  });
  
  test("bad request if invalid data", async () => {
    const resp = await request(app)
      .patch(`/employees/leviathan/${testEmployeesLeviathanIds[0]}`)
      .send({
        firstName: "updated first Name",
        lastName: 999,
      })
    expect(resp.statusCode).toEqual(400);
  });
});