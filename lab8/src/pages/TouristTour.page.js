const TezTourBase = require('./TezTourBase.page');
const { By, until } = require("selenium-webdriver");

class TouristTourPage extends TezTourBase {

  #TOURIST_URL = 'https://tourist.tez-tour.com/';

  currentCurrencyCss = '.fixed-bottom-mob-panel .current';
  USDCurrencyCss = '.right-side ul > li:nth-child(2) > span';
  currentCurrencyXpath = '//div[text()="USD"]';
  excursionTabCss = '.storeTab-excursions > a > span';
  excursionsInputCss = '.ns-excursions .input-enter-text input';
  excursionNameCss = '.search-items .place-list-item > div > div';
  findExcursionsButtonCss = '.button_block > button';
  queryExcursionsCss = 'div:nth-child(1) > div:nth-child(1) > div > div.type';
  excursionsResult = '.hotels-main-side';
  favoriteButtonCss = '.favoriteButton i';
  favoriteListCss = '.popover_conteiner > div';
  countryTourInputCss = '.arr-point .search-field-head input';
  countryTourListCss = '.search-items .ref-item-1-c > div > div';
  findToursButtonCss = '.form-inner .button_block > button';
  countryToursResultCss = '.is-scroll-here';

  countryInputCss = '.is-main-page .input-enter-text input';

  constructor(driver) {
    super(driver);
  }

  async waitCurrencyButton() {
    return this.driver.wait(until.elementLocated(By.xpath(this.currentCurrencyXpath)));
  }

  async waitExcursionTab() {
    return this.driver.wait(until.elementLocated(By.css(this.excursionTabCss)));
  }

  async waitExcursionInput() {
    return this.driver.wait(until.elementLocated(By.css(this.excursionsInputCss)));
  }

  async waitExcursionsMenuToVena() {
    return this.driver.wait(until.elementLocated(By.css(this.excursionNameCss)));
  }

  async waitExcursionsTable() {
    return this.driver.wait(until.elementLocated(By.css(this.excursionsResult)));
  }

  async waitFavoriteList() {
    return this.driver.wait(until.elementLocated(By.css(this.favoriteListCss)));
  }

  async waitCountryToursResult() {
    return this.driver.wait(until.elementLocated(By.css(this.countryToursResultCss)));
  }

  async waitCountryTourInput() {
    return this.driver.wait(until.elementLocated(By.css(this.countryTourInputCss)));
  }

  async waitCountryTourList() {
    return this.driver.wait(until.elementLocated(By.css(this.countryTourListCss)));
  }

  goToTouristPage() {
    this.driver.get(this.#TOURIST_URL);
    return this;
  }

  chooseCountryTour() {
    this.clickBy('css', this.countryTourListCss);
    return this;
  }

  openExcursionTab() {
    this.clickBy('css', this.excursionTabCss);
    return this;
  }

  writeExcursion(excursionName) {
    this.enterTextBy('css', this.excursionsInputCss, excursionName);
    return this;
  }

  chooseExcursionToVena() {
    this.clickBy('css', this.excursionNameCss);
    return this;
  }

  findTours() {
    this.clickBy('css', this.findToursButtonCss);
    return this;
  }

  async getExcursionsInputValue() {
    const excursionInput = await this.driver.findElement(By.css(this.excursionsInputCss));
    return excursionInput.getAttribute('value');
  }

  findExcursions() {
    this.clickBy('css', this.findExcursionsButtonCss);
    return this;
  }

  async getTourListResult() {
    const toursResultElement = await this.driver.findElement(By.css(this.countryToursResultCss));
    return toursResultElement.getText();
  }

  openFavoriteList() {
    this.clickBy('css', this.favoriteButtonCss);
    return this;
  }

  async getFavoriteListValue() {
    const favoriteElement = await this.driver.findElement(By.css(this.favoriteListCss));
    return favoriteElement.getText();
  }

  async getExcursionsToVena() {
    const excursions = await this.driver.findElements(By.css(this.queryExcursionsCss));
    const excursionsName = await Promise.all(excursions.map(excursion => excursion.getText()));

    return excursionsName.every(name => name === 'Вена');
  }

  writeCountryNameTour(countryName) {
    this.enterTextBy('css', this.countryTourInputCss, countryName);
    return this;
  }

  inputCountry() {
    this.enterTextBy('css', this.countryInputCss, 'Турция');
    return this;
  }

  openCurrencyMenu() {
    this.clickBy('css', this.currentCurrencyCss);
    return this;
  }

  changeCurrencyToUSD() {
    this.clickBy('css', this.USDCurrencyCss);
    return this;
  }

  async getCurrentCurrency() {
    const currencyButton = await this.driver.findElement(By.css(this.currentCurrencyCss));
    return currencyButton.getText();
  }


}

module.exports = TouristTourPage;
