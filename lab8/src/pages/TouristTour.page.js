const TezTourBase = require('./TezTourBase.page');
const { By, until } = require("selenium-webdriver");

class TouristTourPage extends TezTourBase {

  #TOURIST_URL = 'https://tourist.tez-tour.com/';

  _currentCurrencyCss = '.fixed-bottom-mob-panel .current';
  _USDCurrencyCss = '.right-side ul > li:nth-child(2) > span';
  _currentCurrencyXpath = '//div[text()="USD"]';
  _excursionTabCss = '.storeTab-excursions > a > span';
  _excursionsInputCss = '.ns-excursions .input-enter-text input';
  _excursionNameCss = '.search-items .place-list-item > div > div';
  _findExcursionsButtonCss = '.button_block > button';
  _queryExcursionsCss = 'div:nth-child(1) > div:nth-child(1) > div > div.type';
  _excursionsResult = '.hotels-main-side';
  _favoriteButtonCss = '.favoriteButton i';
  _favoriteListCss = '.favorite-list-box .popover_conteiner > div';
  _countryTourInputCss = '.arr-point .search-field-head input';
  _countryTourListCss = '.search-items .ref-item-1-c > div > div';
  _findToursButtonCss = '.form-inner .button_block > button';
  _countryToursResultCss = '.is-scroll-here';

  constructor(driver) {
    super(driver);
  }

  async getFavoriteListValue() {
    const favoriteElement = await this.driver.findElement(By.css(this._favoriteListCss));
    this.logger.info('Get message that indicate empty favorite list');
    return favoriteElement.getText();
  }

  async getExcursionsToVena() {
    const excursions = await this.driver.findElements(By.css(this._queryExcursionsCss));
    const excursionsName = await Promise.all(excursions.map(excursion => excursion.getText()));
    this.logger.info('Get excursions in Vena');
    return excursionsName.every(name => name === 'Вена');
  }

  async getExcursionsInputValue() {
    const excursionInput = await this.driver.findElement(By.css(this._excursionsInputCss));
    return excursionInput.getAttribute('value');
  }

  async getTourListResult() {
    const toursResultElement = await this.driver.findElement(By.css(this._countryToursResultCss));
    this.logger.info('Get tours to Turkey');
    return toursResultElement.getText();
  }

  async waitCurrencyButton() {
    return this.driver.wait(until.elementLocated(By.xpath(this._currentCurrencyXpath)));
  }

  async waitExcursionTab() {
    return this.driver.wait(until.elementLocated(By.css(this._excursionTabCss)));
  }

  async waitExcursionInput() {
    return this.driver.wait(until.elementLocated(By.css(this._excursionsInputCss)));
  }

  async waitExcursionsMenuToVena() {
    return this.driver.wait(until.elementLocated(By.css(this._excursionNameCss)));
  }

  async waitExcursionsTable() {
    return this.driver.wait(until.elementLocated(By.css(this._excursionsResult)));
  }

  async waitFavoriteList() {
    return this.driver.wait(until.elementLocated(By.css(this._favoriteListCss)));
  }

  async waitCountryToursResult() {
    return this.driver.wait(until.elementLocated(By.css(this._countryToursResultCss)));
  }

  async waitCountryTourInput() {
    return this.driver.wait(until.elementLocated(By.css(this._countryTourInputCss)));
  }

  async waitCountryTourList() {
    return this.driver.wait(until.elementLocated(By.css(this._countryTourListCss)));
  }

  async waitFavoriteButton() {
    return this.driver.wait(until.elementLocated(By.css(this._favoriteButtonCss)));
  }

  goToTouristPage() {
    this.logger.info('Open tourist page');
    this.driver.get(this.#TOURIST_URL);
    return this;
  }

  chooseCountryTour() {
    this.logger.info('Choose Turkey from country tours');
    this.clickBy('css', this._countryTourListCss);
    return this;
  }

  openExcursionTab() {
    this.logger.info('Open excursion tab');
    this.clickBy('css', this._excursionTabCss);
    return this;
  }

  writeExcursion(excursionName) {
    this.logger.info('Input excursion in Vena');
    this.enterTextBy('css', this._excursionsInputCss, excursionName);
    return this;
  }

  chooseExcursionToVena() {
    this.logger.info('Choose excursions in Vena');
    this.clickBy('css', this._excursionNameCss);
    return this;
  }

  findTours() {
    this.logger.info('Find tours to Turkey');
    this.clickBy('css', this._findToursButtonCss);
    return this;
  }

  findExcursions() {
    this.logger.info('Find excursions in Vena');
    this.clickBy('css', this._findExcursionsButtonCss);
    return this;
  }

  openFavoriteList() {
    this.logger.info('Open favorite list');
    this.clickBy('css', this._favoriteButtonCss);
    return this;
  }

  writeCountryNameTour(countryName) {
    this.logger.info('Write Turkey to country name field');
    this.enterTextBy('css', this._countryTourInputCss, countryName);
    return this;
  }

  openCurrencyMenu() {
    this.logger.info('Open currency menu');
    this.clickBy('css', this._currentCurrencyCss);
    return this;
  }

  changeCurrencyToUSD() {
    this.logger.info('Change current currency to USD');
    this.clickBy('css', this._USDCurrencyCss);
    return this;
  }

  async getCurrentCurrency() {
    this.logger.info('Get current currency');
    const currencyButton = await this.driver.findElement(By.css(this._currentCurrencyCss));
    return currencyButton.getText();
  }

}

module.exports = TouristTourPage;
