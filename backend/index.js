import express from "express";
import mysql from "mysql";

// express is a Node.js web application framework that provides a robust set of features for web and mobile applications.
const app = express();

// Create a connection to the database
const db = mysql.createConnection({
  // what is docker container ?
  // A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

  // "localhost do not work" because we are using docker container for mysql server and we have to use the ip address of the container to connect to the mysql server
  host: "127.0.0.1",
  user: "root",
  password: "Faisal143@",
  database: "test",
});

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// get request to the root of the server
app.get("/", (req, res) => {
  const q = "SELECT * FROM test.Tables";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//  get request to the books table of the server
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// post request to the books table of the server
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  // query to insert the data into the books table
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added successfully!!!");
  });
});

// app.get("/alter-user", (req, res) => {
//   const alterQuery =
//     "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Faisal143@'";

//   db.query(alterQuery, (alterErr, alterResult) => {
//     if (alterErr) {
//       return res.json(alterErr);
//     }

//     // Alteration successful, provide a response
//     return res.json({
//       message: "User authentication method changed successfully.",
//     });
//   });
// });

app.listen(8800, () => {
  console.log("Connected to backend!!!");
});
