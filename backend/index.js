import express from "express";
// mysql is a node.js driver for mysql. It is written in JavaScript, does not require compiling.
import mysql from "mysql";
import cors from "cors";
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
app.use(cors());

// get request to the root of the server
app.get("/", (req, res) => {
  res.json("Hello this is the backend");
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
  const q = "INSERT INTO books (`title`, `desc`,`price` ,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  // query to insert the data into the books table
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added successfully!!!");
  });
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`=?, `cover`=? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!!");
});
