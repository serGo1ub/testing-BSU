const webdriver = require('selenium-webdriver');
const TezTourBasePage = require('./TezTourBase.page');
const { until } = require("selenium-webdriver");
const { By } = webdriver;

class TezTourMainPage extends TezTourBasePage {

  isTourFormComplete = false;

  #BASE_URL = 'https://www.tez-tour.com/';

  hotelInputCss = '#hs-form > div.search-btn-point > input';
  hotelNameInputCss = '#hotelname';
  hotelNameCss = 'td.hotel-list-td2 > a';
  hotelsTabCss = '.main-search-form-tabs li:nth-child(2) > a';
  welcomeModalCss = '#fancybox-close';
  tableHotelsCss = '#grid-list > tbody > tr';
  geolocationButtonCss = '#city-dropdown > i > b';
  geolocationMenuCss = '#city-list';
  voronezhGeolocationButtonCss = '#city-list ul:nth-child(1) > li:nth-child(6) > a';
  voronezhGeolocationXpath = '//b[text()="Воронеж"]';

  constructor(driver) {
    super(driver);
  }

  goToTourSite() {
    this.driver.get(this.#BASE_URL);
    return this;
  }

  async getFoundHotelName(len) {
    const hotelName = this.driver
      .findElement(By.css(this.hotelNameCss))
      .then(hotelText => hotelText.getText())
      .then(hotelName => hotelName.trim().slice(0, len));
    this.logger.info('Find hotel name');
    return hotelName;
  }

  async waitTableHotels() {
    return this.driver.wait(until.elementLocated(By.css(this.tableHotelsCss)));
  }

  async waitWelcomeModal() {
    return this.driver.wait(until.elementLocated(By.css(this.welcomeModalCss)));
  }

  async waitGeolocationMenu() {
    console.log('waitGeolocationMenu');
    return this.driver.wait(until.elementLocated(By.css(this.geolocationMenuCss)));
  }

  async waitGeolocationButton() {
    console.log('waitGeolocationButton');
    return this.driver.wait(until.elementLocated(By.xpath(this.voronezhGeolocationXpath)));
  }

  openHotelsTab() {
    this.clickBy('css', this.hotelsTabCss);
    this.logger.info('Hotels tab opened');
    return this;
  }

  openGeolocationMenu() {
    this.clickBy('css', this.geolocationButtonCss);
    return this;
  }

  changeGeolocationToVoronezh() {
    console.log('changeGeolocationToVoronezh');
    this.clickBy('css', this.voronezhGeolocationButtonCss);
    return this;
  }

  async getGeolocation() {
    console.log('getGeolocation');
    const geolocationButton = await this.driver.findElement(By.css(this.geolocationButtonCss));
    return geolocationButton.getText();
  }

  setFormFieldByName(formFieldName, formFieldValue) {
    const valueSelected = By.css(`[name="${ formFieldName }"] option[value="${ formFieldValue }"]`);
    this.clickBy('css', `[name="${ formFieldName }"]`);
    this.clickBy('css', valueSelected);
  }

  setTourFormValues(hotelInfo) {
    this.chooseCountry(hotelInfo.getCountryCode());
    this.enterTextBy('css', this.hotelNameInputCss, hotelInfo.getHotelName());
    this.chooseHotelLevel(hotelInfo.getHotelRateCode());
    this.choosePansion(hotelInfo.getPansionCode());
    this.isTourFormComplete = true;
    return this;
  }

  findHotels() {
    if (this.isTourFormComplete) {
      this.clickBy('css', this.hotelInputCss);
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
