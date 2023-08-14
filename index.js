const path = require("path");

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

const connectDB = require('./util/db');
const Dictionary = require("./models/dictionary");

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/dictionary", (req, res) => {
  Dictionary.find({}, (err, results) => {
    if (err) return res.status(500).json({ success: false, err });
    return res.status(200).json({ success: true, data: results });
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
