const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "build") }, (err) => {
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
