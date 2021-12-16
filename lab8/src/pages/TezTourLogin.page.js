const TezTourBasePage = require("./TezTourBase.page");
const { until, By } = require("selenium-webdriver");

class TezTourLoginPage extends TezTourBasePage {

  #LOGIN_URL = 'https://tourist.tez-tour.com/login';

  _emailInputCss = 'form > .form-field > input[name=email]';
  _nextStepBtnCss = '.ref-auth .content-spacer > input';
  _errorMessageCss = '.ref-auth .content-spacer .error-message';

  constructor(driver) {
    super(driver);
  }

  async getErrorMessage() {
    this.logger.info('Get error message by invalid email');
    return this.driver
      .findElement(By.css(this._errorMessageCss))
      .getAttribute('textContent');
  }

  async waitEmailField() {
    return this.driver.wait(until.elementLocated(By.css(this._emailInputCss)));
  }

  async waitErrorMessage() {
    return this.driver.wait(until.elementLocated(By.css(this._errorMessageCss)));
  }

  goToLoginPage() {
    this.driver.get(this.#LOGIN_URL);
    this.logger.info('Open login page');
    return this;
  }

  enterEmail(email) {
    this.logger.info('Input email to email field');
    this.enterTextBy('css', this._emailInputCss, email);
    return this;
  }

  submitEmail() {
    this.logger.info('Submit login form');
    this.clickBy('css', this._nextStepBtnCss);
    return this;
  }

}

module.exports = TezTourLoginPage;
