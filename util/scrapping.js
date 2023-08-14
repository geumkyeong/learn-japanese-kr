// require("chromedriver");
let { By, Builder } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let proxy = require("selenium-webdriver/proxy");
// let service = new chrome.ServiceBuilder("C:/path/to/chromedriver/chromedriver.exe");
let opts = new chrome.Options();

const fetchDict = async () => {
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

  opts.setChromeBinaryPath("C:/path/to/chromedriver/chromedriver.exe");

  opts.setProxy(proxy.manual({ http: `<${host}>` }));
  opts.addArguments(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );

  opts.addArguments("--headless");

  let driver = await new Builder()
    .forBrowser("chrome")
    // .setChromeService(service)
    .setChromeOptions(opts)
    .build();

  try {
    await driver.get(
      "https://ja.dict.naver.com/#/jlpt/list?level=5&part=allClass&page=" + 1
    );

    let jlpt_list = await driver.findElement(By.id("my_jlpt_list_template"));
    let rows = await jlpt_list.findElements(By.className("row"));

    let result = [];
    for (let row of rows) {
      let origin = await row.findElement(By.className("origin"));
      let list = await row.findElement(By.className("mean_list"));

      let title = await origin.getText();
      let description = await list.getText();

      result.push({ title: title.split("\n")[0], description: description });
    }

    await driver.manage().setTimeouts({ implicit: 500 });

    return result;
  } finally {
    await driver.quit();
  }
};

module.exports = fetchDict;
