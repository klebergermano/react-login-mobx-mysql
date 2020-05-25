const express = require("express");
const app = express();
app.use(express.json());

const connection = require("./config/connection");

connection.query("SELECT * FROM curso", (err, results) => {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log(`Server running on ${process.env.PORT || port}`);
});
