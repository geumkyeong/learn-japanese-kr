const { Builder, By } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let options = new chrome.Options();
let service = new chrome.ServiceBuilder();
// "C:/path/to/chromedriver/chromedriver.exe"
options.setChromeBinaryPath(require("chromedriver").path);
options.headless();

const fetchDict = async () => {
  /* options.addArguments(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );
 */
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
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
