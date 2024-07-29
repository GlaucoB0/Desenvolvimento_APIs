import mysql from "mysql2";

const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  port: process.env.PORT_DB,
});

conn.query("SELECT 1 + 1 AS solution", (err, result, fields) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("The solution is:", result[0].solution);
});

export default conn;
