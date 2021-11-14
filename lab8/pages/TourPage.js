const webdriver = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("test-type");
chromeOptions.addArguments("start-maximized");
chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--no-sandbox");
chromeOptions.addArguments("--disable-dev-shm-usage");
const { By } = webdriver;
const driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

class TourPage {

  goToTourSite(theURL){
    driver.get(theURL);
  }

  closeWelcomeModal(css) {
    this.clickByCss(css);
    return this;
  }

  openHotelsTab(css) {
    this.clickByCss(css);
    return this;
  }

  getFoundHotelsLength(css) {
      return driver.findElement(By.css(css))
      .findElements(By.css('#grid-list > tbody > tr'))
      .then(function(hotels){
        return hotels.length;
    });
  }

  enterTextByCss(css, searchText){
    driver.findElement(By.css(css)).sendKeys(searchText);
  }

  choosePansion(pansionCode) {
    const valueSelected = By.css(`[name="searchPansionId"] option[value="${ pansionCode }"]`);
    driver.findElement(By.css('[name="searchPansionId"]')).click();
    driver.findElement(valueSelected).click();
  }

  chooseHotelLevel(hotelRateCode) {
    const valueSelected = By.css(`[name="searchHotelTypeId"] option[value="${ hotelRateCode }"]`);
    driver.findElement(By.css('[name="searchHotelTypeId"]')).click();
    driver.findElement(valueSelected).click();
  }

  chooseCountry(countryCode) {
    const valueSelected = By.css(`[name="searchCountryId"] option[value="${ countryCode }"]`);
    driver.findElement(By.css('[name="searchCountryId"]')).click();
    driver.findElement(valueSelected).click();
  }

  clickByCss(css){
    driver.findElement(By.css(css)).click();
  }

}

module.exports = {
  TourPage,
  driver
};
