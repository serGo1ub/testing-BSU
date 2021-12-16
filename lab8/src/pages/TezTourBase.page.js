const { createLogger, format, transports } = require("winston");
const { By, until } = require('selenium-webdriver');

class TezTourBasePage {

  constructor(driver) {
    this.driver = driver;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.Console()
      ]
    });
  }

  findElementBy(by, searchPath) {
    return this.driver.findElement(By[by](searchPath));
  }

  enterTextBy(by, searchPath, searchText) {
    this.findElementBy(by, searchPath).sendKeys(searchText);
  }

  clickBy(by, searchPath) {
    this.findElementBy(by, searchPath).click();
  }

  closeWelcomeModal() {
    this.clickBy('css', this.welcomeModalCss);
    return this;
  }

}

module.exports = TezTourBasePage;
