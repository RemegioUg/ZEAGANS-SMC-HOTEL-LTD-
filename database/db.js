const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "food_db_secure (2)",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected....");
});

module.exports = conn;
