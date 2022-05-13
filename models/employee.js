const db = require("../db");
const { ExpressError } = require("../expressError");


class Employee {
  /** get all empolyees 
    returns
{
"employees": [
    {
		"email": "larryd@test.net",
		"firstName": "Larry",
		"telephone": "555-555-8090",
		"role": "consultant",
		"id": "4cd3586e-1fbe-4a08-946f-0a7df38918a2",
		"lastName": "David"
	}, .....]
   */
  static async showAll() {
    const results = await db.query(`
    SELECT
    id,
    firstName,
    lastName,
    email,
    leviathanID,
    telephone,
    role
    FROM
    employee
    `);
    return results.rows;
  };

 

/** get an employee record from db by leviathanID;
    returns
{
"employee": 
    {
		"email": "larryd@test.net",
		"firstName": "Larry",
		"telephone": "555-555-8090",
		"role": "consultant",
		"id": "4cd3586e-1fbe-4a08-946f-0a7df38918a2",
    "leviathanID" ""4cd3586e-1fbe-4a08-946f-0a7df38918a2"":
		"lastName": "David"
	}
   */
  
  static async showEmployeeByLeviathanID(leviathanID) {
    const results = await db.query(
      `SELECT 
      id,
      firstName,
      lastName,
      email,
      leviathanID,
      telephone,
      role
      FROM
      employee
      WHERE
      leviathanID = $1`,
      [leviathanID]
    );
    return results.rows;
  }


//   /** get an employee record from db by ID;
//     returns
// {
// "employee": 
//     {
// 		"email": "larryd@test.net",
// 		"firstName": "Larry",
// 		"telephone": "555-555-8090",
// 		"role": "consultant",
// 		"id": "4cd3586e-1fbe-4a08-946f-0a7df38918a2",
//     "leviathanID" ""4cd3586e-1fbe-4a08-946f-0a7df38918a2"":
// 		"lastName": "David"
// 	}
  
  static async showEmployeeById(id) {
    const results = await db.query(
      `SELECT 
      id,
      firstName,
      lastName,
      email,
      leviathanID,
      telephone,
      role
      FROM
      employee
      WHERE
      id = $1`,
      [id]
    );
    return results.rows[0];
  }


  // fn to add a employee record into db;
  static async addEmployee(
    firstName,
    lastName,
    email,
    leviathanID,
    telephone,
    role
  ) {
      const results = await db.query(
        `INSERT 
        INTO 
        employee
        (
        firstName,
        lastName,
        email,
        leviathanID,
        telephone,
        role
        )
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING
      id,
      firstName,
      lastName,
      email,
      leviathanID,
      telephone,
      role
      `,
        [
          firstName,
          lastName,
          email,
          leviathanID,
          telephone,
          role
        ]);
      return results.rows[0];
  };

/** edit employee, return {employee: employee} */
  
  static async updateEmployee(data, id) {
    const {
      firstName,
      lastName,
      email,
      telephone,
      role } = data;
    try {
      const results = await db.query(
        `UPDATE
        employee
        SET
        firstName = $1,
        lastName=$2,
        email = $3,
        telephone = $4,
        role=$5
        WHERE
        id = $6
        RETURNING
          id,
          firstName,
          lastName,
          email,
          leviathanID,
          telephone,
          role`,
        [firstName,
          lastName,
          email,
          telephone,
          role, id]);
      return results.rows[0];
    } catch (e) { 
      throw new ExpressError(e.message, 400)
    }
    
  };
/** delete employee, return id */

  static async deleteEmployee(id) {
    const results = await db.query(
      `DELETE
       FROM
       employee
       WHERE
       id = $1
       RETURNING id`,
      [id]);
    return results.rows[0];
  };


/** delete employee by LeviathanID, return id */

  static async deleteEmployeeByLeviathanID(LeviathanID) {
    const results = await db.query(
      `DELETE
       FROM
       employee
       WHERE
       id = $1
       RETURNING id`,
      [LeviathanID]);
    return results.rows[0];
  };
};




module.exports = Employee;