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

async function run() {
  await mongoose
    .connect(config.mongoURI)
    .then(async () => {
      const result = await fetchDict();

      Dictionary.deleteMany({}, (err) => {
        if (err) console.log(err);
        console.log("Initialize Dictionary data");
      });

      Dictionary.insertMany(result, (err, results) => {
        if (err) console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

run();

require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let proxy = require("selenium-webdriver/proxy");
let options = new chrome.Options();

async function fetchDict() {
  let host =
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    ":" +
    Math.floor(Math.random() * 1023);

  options.setProxy(proxy.manual({ http: `<${host}>` }));

  options.addArguments(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    let url =
      "https://ja.dict.naver.com/#/jlpt/list?level=5&part=allClass&page=";

    let dictionary = [];
    for (let i = 1; i < 20; i++) {
      await driver.get(url + i);

      let list = driver.findElement(By.id("my_jlpt_list_template"));
      let rows = await list.findElements(By.tagName("li"));

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
      // wait for scraping
      await driver.manage().setTimeouts({ implicit: 200 });
    }

    // only accapted exist data.
    const result = dictionary.filter((data) => data !== undefined);

    return result;
  } finally {
    await driver.quit();
  }
}

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
