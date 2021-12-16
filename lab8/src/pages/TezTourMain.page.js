const webdriver = require('selenium-webdriver');
const TezTourBasePage = require('./TezTourBase.page');
const { until } = require("selenium-webdriver");
const { By } = webdriver;

class TezTourMainPage extends TezTourBasePage {

  #BASE_URL = 'https://www.tez-tour.com/';

  _isTourFormComplete = false;

  _hotelInputCss = '#hs-form > div.search-btn-point > input';
  _hotelNameInputCss = '#hotelname';
  _hotelNameCss = 'td.hotel-list-td2 > a';
  _hotelsTabCss = '.main-search-form-tabs li:nth-child(2) > a';
  _tableHotelsCss = '#grid-list > tbody > tr';
  _geolocationButtonCss = '#city-dropdown > i > b';
  _geolocationMenuCss = '#city-list';
  _voronezhGeolocationButtonCss = '#city-list ul:nth-child(1) > li:nth-child(6) > a[ref="vrn"]';
  _voronezhGeolocationXpath = '//b[text()="Воронеж"]';

  constructor(driver) {
    super(driver);
  }

  goToTourSite() {
    this.logger.info('Open tez tour site');
    this.driver.get(this.#BASE_URL);
    return this;
  }

  async getFoundHotelName(len) {
    const hotelName = this.driver
      .findElement(By.css(this._hotelNameCss))
      .then(hotelText => hotelText.getText())
      .then(hotelName => hotelName.trim().slice(0, len));
    this.logger.info('Get query hotel name');
    return hotelName;
  }

  async waitTableHotels() {
    return this.driver.wait(until.elementLocated(By.css(this._tableHotelsCss)));
  }

  async waitWelcomeModal() {
    return this.driver.wait(until.elementLocated(By.css(this._welcomeModalCss)));
  }

  async waitGeolocationMenu() {
    return this.driver.wait(until.elementLocated(By.css(this._geolocationMenuCss)));
  }

  async waitGeolocationButton() {
    return this.driver.wait(until.elementLocated(By.xpath(this._voronezhGeolocationXpath)));
  }

  openHotelsTab() {
    this.clickBy('css', this._hotelsTabCss);
    this.logger.info('Open hotels tab');
    return this;
  }

  openGeolocationMenu() {
    this.logger.info('Open geolocation menu');
    this.clickBy('css', this._geolocationButtonCss);
    return this;
  }

  changeGeolocationToVoronezh() {
    this.clickBy('css', this._voronezhGeolocationButtonCss);
    return this;
  }

  async getGeolocation() {
    this.logger.info('Get current geolocation');
    const geolocationButton = await this.driver.findElement(By.css(this._geolocationButtonCss));
    return geolocationButton.getText();
  }

  setFormFieldByName(formFieldName, formFieldValue) {
    const valueSelected = By.css(`[name="${ formFieldName }"] option[value="${ formFieldValue }"]`);
    this.clickBy('css', `[name="${ formFieldName }"]`);
    this.clickBy('css', valueSelected);
  }

  setTourFormValues(hotelInfo) {
    this.chooseCountry(hotelInfo.getCountryCode());
    this.enterTextBy('css', this._hotelNameInputCss, hotelInfo.getHotelName());
    this.chooseHotelLevel(hotelInfo.getHotelRateCode());
    this.choosePansion(hotelInfo.getPansionCode());
    this.isTourFormComplete = true;
    this.logger.info('Input hotels info to form');
    return this;
  }

  findHotels() {
    if (this.isTourFormComplete) {
      this.clickBy('css', this._hotelInputCss);
      this.logger.info('Find query hotels');
      this.isTourFormComplete = false;
    }
  }

  choosePansion(pansionCode) {
    this.setFormFieldByName("searchPansionId", pansionCode);
  }

  chooseHotelLevel(hotelRateCode) {
    this.setFormFieldByName("searchHotelTypeId", hotelRateCode);
  }

  chooseCountry(countryCode) {
    this.setFormFieldByName("searchCountryId", countryCode);
  }

}

module.exports = TezTourMainPage
