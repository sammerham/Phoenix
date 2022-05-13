const db = require("../db");
const { ExpressError } = require("../expressError");


class Employee {
  /** get all empolyees 
    returns
{
"employees": [
		{
			"id": 1,
			"firstname": "testFirst",
			"lastname": "test",
			"email": "foo@bar.com",
			"leviathanid": "a72a8054-ce39-4b3b-bee1-aa7e8cc173ac",
			"telephone": "1112223333",
			"role": "owner"
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

 


/** get an employee record from db by ID;
    returns
{
	"employee": {
		"id": 1,
		"firstname": "testFirst",
		"lastname": "test",
		"email": "foo@bar.com",
		"leviathanid": "a72a8054-ce39-4b3b-bee1-aa7e8cc173ac",
		"telephone": "1112223333",
		"role": "owner"
	}
}
   */
  
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
      leviathanid = $1`,
      [leviathanID]
    );
    return results.rows[0];
  }

  /** Add an employee record into db ;
    returns
{
	"employee": {
		"id": 1,
		"firstname": "testFirst",
		"lastname": "test",
		"email": "foo@bar.com",
		"leviathanid": "a72a8054-ce39-4b3b-bee1-aa7e8cc173ac",
		"telephone": "1112223333",
		"role": "owner"
	}
}
   */
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


/** Edit an employee record with id;
    returns
{
	"employee": {
		"id": 1,
		"firstname": "testFirst",
		"lastname": "test",
		"email": "foo@bar.com",
		"leviathanid": "a72a8054-ce39-4b3b-bee1-aa7e8cc173ac",
		"telephone": "1112223333",
		"role": "owner"
	}
}
   */
  
  static async updateEmployeeById(data, id) {
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



  /** Edit an employee record with leviathanid;
    returns
{
	"employee": {
		"id": 1,
		"firstname": "testFirst",
		"lastname": "test",
		"email": "foo@bar.com",
		"leviathanid": "a72a8054-ce39-4b3b-bee1-aa7e8cc173ac",
		"telephone": "1112223333",
		"role": "owner"
	}
}
   */
  
  static async updateEmployeeByLeviathanid(data, leviathanid) {
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
        leviathanid = $6
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
          role, leviathanid]);
      return results.rows[0];
    } catch (e) { 
      throw new ExpressError(e.message, 400)
    }
    
  };

/** delete employee, return id 
 returns
 {
	"message": "Employee deleted!"
}
*/

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
       leviathanid = $1
       RETURNING id`,
      [LeviathanID]);
    return results.rows[0];
  };
};




module.exports = Employee;