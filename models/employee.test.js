"use strict";

const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

const db = require("../db");
const Employee = require("./employee");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');



beforeAll(commonBeforeAll);

beforeEach(commonBeforeEach);

afterEach(commonAfterEach);

afterAll(commonAfterAll);
/************************************** Data */
const data = [
  {
    id: expect.any(Number),
    firstname: 'd1',
    lastname: 'test1',
    email: 'd1@test.com',
    telephone: '111-111-1111',
    role: 'driver',
    leviathanid: 'leviathantest1'
  },
  {
    id: expect.any(Number),
    firstname: 'd2',
    lastname: 'test2',
    email: 'd2@test.com',
    telephone: '222-222-2222',
    role: 'admin',
    leviathanid: 'leviathantest2'
  },
  {
    id: expect.any(Number),
    firstname: 'd3',
    lastname: 'test3',
    email: 'd3@test.com',
    telephone: '333-333-3333',
    role: 'cashier',
    leviathanid: 'leviathantest3'
  },
]
/************************************** ShowAllEmployees*/
describe("Show All Employees", () => {
  test("works", async () => {
    const employees = await Employee.showAll();
    expect(employees).toEqual(data);
  });
});


/************************************** ShowEmployeeById */
describe("Show employee By Id", () => {
  test("works", async () => {
    const employees = await Employee.showAll();
    const empById = await Employee.showEmployeeById(employees[0].id);
    expect(empById).toEqual(data[0]);
  });

  test("not found if no such employee", async () => {
    try {
      await Employee.showEmployeeById(0);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** ShowEmployeeByleviathanID */
describe("Show employee By leviathanID", () => {
  test("works", async () => {
    const employees = await Employee.showAll();
    const empByLeviathanId = await Employee.showEmployeeByLeviathanID(employees[0].leviathanid);
    expect(empByLeviathanId).toEqual(data[0]);
  });

  test("not found if no such employee", async () => {
    try {
      await Employee.showEmployeeByLeviathanID('notfound');
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** Add Employee */

describe("Add Employee", () => {
 const newEmployee = {
    firstName: 'newEmployee',
    lastName: 'NewLast',
    email: 'newEmployee@test.com',
    leviathanID:'testid',
    telephone:'111-111-1111',
    role:'driver'
  };
  

  test("works", async () => {
    const emp = await Employee.addEmployee(...Object.values(newEmployee));
    expect(emp.firstname).toEqual('newEmployee');
    expect(emp.lastname).toEqual('NewLast');
    expect(emp.email).toEqual('newEmployee@test.com');
    expect(emp.leviathanid).toEqual('testid');
    expect(emp.telephone).toEqual('111-111-1111');
    expect(emp.role).toEqual('driver');
  });

   test("bad request if no data", async () => {
    try {
      await Employee.addEmployee();
      fail();
    } catch (err) {
      expect(err.code).toEqual('23502');
      expect(err.message).toEqual(expect.stringContaining('violates not-null constraint'));
    }
  });
});


/************************************** Delete Employee by id*/

describe("Delete an employee", () => {
  test("works", async () => {
    const employees = await Employee.showAll();
    await Employee.deleteEmployee(employees[0].id);
    const res = await Employee.showEmployeeById(employees[0].id)
    expect(res).toEqual(undefined);
  });

  test("not found if no such employee", async () => {
    try {
      await Employee.deleteEmployee(9990);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** Delete Employee by LeviathanID*/

describe("Delete an employee by LeviathanID", () => {
  const newEmployee = {
    firstName: 'newEmployee',
    lastName: 'NewLast',
    email: 'newEmployee@test.com',
    leviathanID:'testid',
    telephone:'111-111-111',
    role:'driver'
  };

  test("works", async () => {
    const emp = await Employee.addEmployee(...Object.values(newEmployee));
    await Employee.deleteEmployee(emp.leviathanID);
    const res = await Employee.showEmployeeById(emp.leviathanID)
    expect(res).toEqual(undefined);
  });

  test("not found if no such employee with provided leviathanID ", async () => {
    try {
      await Employee.deleteEmployee('9990');
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update an employee BY ID */

describe("update an employee", () => {
  const updateData = {
    firstName: 'updatedEmployee',
    lastName: 'updateLast',
    email: 'updateemployee@test.com',
    telephone: '000-000-0000',
    role:'updatedRole'
  };


  test("works", async () => {
    const employees = await Employee.showAll();
    const updatedEmp = await Employee.updateEmployeeById(updateData,employees[0].id);
    expect(updatedEmp.firstname).toEqual('updatedEmployee');
    expect(updatedEmp.lastname).toEqual('updateLast');
    expect(updatedEmp.email).toEqual('updateemployee@test.com');
    expect(updatedEmp.role).toEqual('updatedRole');
    expect(updatedEmp.telephone).toEqual('000-000-0000');
  });

  test("bad request if no data", async () => {
    try {
      const employees = await Employee.showAll();
      await Employee.updateEmployeeById(employees[0].id);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
  
  test("not found if no such employee", async () => {
    try {
      await Employee.updateEmployeeById(999999);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update an employee BY leviathanID */

describe("update an employee", () => {
  const updateData = {
    firstName: 'updatedEmployee',
    lastName: 'updateLast',
    email: 'updateemployee@test.com',
    telephone: '000-000-0000',
    role: 'updatedRole',
    leviathanID:'leviathantest1',
  };


  test("works", async () => {
    const employees = await Employee.showAll();
    const updatedEmp = await Employee.updateEmployeeByLeviathanid(updateData,employees[0].leviathanid);
    expect(updatedEmp.firstname).toEqual('updatedEmployee');
    expect(updatedEmp.lastname).toEqual('updateLast');
    expect(updatedEmp.email).toEqual('updateemployee@test.com');
    expect(updatedEmp.role).toEqual('updatedRole');
    expect(updatedEmp.telephone).toEqual('000-000-0000');
  });

  test("bad request if no data", async () => {
    try {
      const employees = await Employee.showAll();
      await await Employee.updateEmployeeByLeviathanid(updateData,employees[0].leviathanid);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
  
  test("not found if no such employee", async () => {
    try {
      await Employee.updateEmployeeByLeviathanid('not found');
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});





