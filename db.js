/** Database setup for mediadb. */

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"
  ?"postgresql:///phoenixdb_test"
  :"postgresql:///phoenixdb"

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;