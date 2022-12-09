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
  .then(async () => {
    const result = await fetchDict();

    Dictionary.insertMany(result, (err, results) => {
      if (err) console.log(err);
      console.log(results);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder(
  "c:/path/to/chromedriver/chromedriver.exe"
);

async function fetchDict() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .build();

  try {
    await driver.get(
      "https://ja.dict.naver.com/#/jlpt/list?level=5&part=allClass&page=1"
    );

    let list = driver.findElement(By.id("my_jlpt_list_template"));
    let rows = await list.findElements(By.tagName("li"));

    let dictionary = [];

    for (let r of rows) {
      let data = await r.getText();
      let row = data.split("\n");

      if (row.length > 1) {
        dictionary.push({
          title: row[0],
          description: row[2],
        });
      }
    }

    // wait for scarping
    await driver.manage().setTimeouts({ implicit: 10000 });

    // only accapted exist data.
    const result = dictionary.filter((data) => data !== undefined);

    return result;
  } finally {
    await driver.quit();
  }
}

app.get("/api/dictionary", (req, res) => {});

app.get("/*", (req, res) => {
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
