const TezTourBasePage = require("./TezTourBase.page");
const { until, By } = require("selenium-webdriver");

class LoginPage extends TezTourBasePage {

  #LOGIN_URL = 'https://tourist.tez-tour.com/login';

  emailInputCss = 'form > .form-field > input[name=email]';
  nextStepBtnCss = '.ref-auth .content-spacer > input';
  errorMessageCss = '.ref-auth .content-spacer .error-message';
  // passwordInputCss = '//*[@id="content"]/div[1]/div/div/div/div/div[2]/div[2]/form/div[2]/div[1]/input';
  // enterToAccountBtnCss = '.ref-auth .btn-form-field > input';
  // welcomeMessageCss = '.listing-title-space > div';

  constructor(driver) {
    super(driver);
  }

  // async waitPasswordField() {
  //
  //   return this.driver.wait(until.elementIsNotVisible(By.xpath(this.passwordInputCss)));
  //   // return this.driver.sleep(5000);
  //   // return this.driver.manage().timeouts().implicitlyWait(1000);
  // }

  async waitEmailField() {
    return this.driver.wait(until.elementLocated(By.css(this.emailInputCss)));
  }

  async waitErrorMessage() {
    return this.driver.wait(until.elementLocated(By.css(this.errorMessageCss)));
  }

  goToLoginPage() {
    this.driver.get(this.#LOGIN_URL);
    this.logger.info('Open login page');
    return this;
  }

  enterEmail(email) {
    this.enterTextBy('css', this.emailInputCss, email);
    return this;
  }

  // enterPassword(password) {
  //   this.enterTextBy('xpath', this.passwordInputCss, password);
  //   return this;
  // }

  submitEmail() {
    this.clickBy('css', this.nextStepBtnCss);
    return this;
  }

  async getErrorMessage() {
    this.logger.info('Get error message by invalid value');
    return this.driver
      .findElement(By.css(this.errorMessageCss))
      .getAttribute('textContent');
  }

}

module.exports = LoginPage;
