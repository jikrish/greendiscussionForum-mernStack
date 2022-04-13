const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = require("./app");
const path = require("path");

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(err));

//app.use(express.static("frontend/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

app.use(express.static("client/build"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
