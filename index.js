const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Dictionary = require("./models/dictionary");
const config = require("./config/keys");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB is Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
    if (err) {
      res.status("500").send(err);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
