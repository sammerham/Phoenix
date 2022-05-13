'use strict'
const express = require("express");
const axios = require("axios");
const router = express.Router();
const URL = process.env.URL;
const API_USER = process.env.APIUser
const API_Key = process.env.APIKey

const { NotFoundError, ExpressError } = require("../expressError");
const Employee = require('../models/employee');



/* GET all media records from db;
{
"employees": 
[
  {
    "id": 10,
    "firstname": "Davissss",
    "lastname": "Smith",
    "email": null,
    "leviathanid": "e78cdb27-3adf-48b8-8d81-7bd2e699f4b0",
    "telephone": "555-666-5454",
    "role": "asd"
	}, ....
]
}
*/


router.get('/', async (req, res, next) => {
  let employeeRecord;
 
  try {
    const response = await axios.get(`${URL}employee/?ApiUser=${API_USER}&ApiKey=${API_Key}`);
    
    const employees = response.data;
    // map over results and insert into DB
    if(employees)
    employees.map(async emp => {
      // check if employee record already exists in db;
 
      employeeRecord = await Employee.showEmployeeByLeviathanID(emp.id);
      //inserting into DB only if record is unique;
      if (employeeRecord.length === 0)
        await Employee.addEmployee(
          emp.firstName,
          emp.lastName,
          emp.email,
          emp.id,
          emp.telephone,
          emp.role
          );
    });
 
    const results = await Employee.showAll();
    res.status(200).json({ employees: results });
  } catch (err) {
    next(new ExpressError(err.message));
  }
});



/** GET /id - returns `{
 employee: {
    "id": 10,
    "firstname": "Davissss",
    "lastname": "Smith",
    "email": null,
    "leviathanid": "e78cdb27-3adf-48b8-8d81-7bd2e699f4b0",
    "telephone": "555-666-5454",
    "role": "asd"
	}}` */

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const employee = await Employee.showEmployeeById(id);
    if (!employee) throw new NotFoundError(`No Employee with id: ${id}`, 404);
    return res.status(200).json({ employee });
  } catch (e) {
    return next(e);
  }
});


router.post("/", async function (req, res, next) {
  
  try {

    // send data to leviathan
    const emp = await axios({
      method: 'post',
      url: `${URL}employee`,
      data: {
        ...req.body,
        ApiKey: "CHALLENGEKEY",
        ApiUser: "CHALLENGEUSER"
      }
    })

    // getting data back from api return
    const { id } = emp.data || null;
    const {
    firstName,
    lastName,
    email,
    telephone,
    role } = req.body;
    
    // add employee to local db
    const result = await Employee.addEmployee(
    firstName,
    lastName,
    email,
    id,
    telephone,
    role);
    return res.status(201).json({ employee:result });
  } catch (e) {
    return next(new ExpressError(e.message, 400));
  }
});



/** DELETE /[id] - delete employee, return `{message: "employee deleted"}` */

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const employee = await Employee.showEmployeeById(id);
    if (!employee) throw new NotFoundError(`No matching employee with ID: ${id}`,404);
    await Employee.deleteEmployee(id);
    return res.status(200).json({ message: `Employee deleted!` });
  } catch (e) {
    return next(e);
  }
});




/** PATCH /[id] - update fields in employee; return `{employee: employee}` */

router.patch("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const employee = await Employee.showEmployeeById(id);
    if (!employee) throw new NotFoundError(`No matching employee with ID: ${id}`,404);
    const updatedEmployee = await Employee.updateEmployee(req.body, id);
    return res.status(200).json({ employee:updatedEmployee });
  } catch (e) {
    return next(e);
  };
});


module.exports = router;