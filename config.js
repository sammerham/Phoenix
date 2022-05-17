

const DB_URI = (process.env.NODE_ENV === "test")
  ?"postgresql:///phoenixdb_test"
  : process.env.DATABASE_URL || "postgresql:///phoenixdb"

const PORT = process.env.PORT || 3001;


module.exports = {
  DB_URI,
  PORT
};
