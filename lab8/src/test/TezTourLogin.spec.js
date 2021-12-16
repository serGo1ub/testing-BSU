const assert = require('assert');
const Driver = require("../driver/Driver");
const LoginPage = require("../pages/Login.page");
const UserCreator = require("../services/UserCreator.service");

describe('Tez tour login page', () => {
  let driver;
  let loginPage

  // beforeEach(async function () {
  //   driver = await Driver.getDriver();
  //   loginPage = new LoginPage(driver);
  // });
  //
  // afterEach(async function () {
  //   await Driver.closeDriver();
  // });
  //
  // it('Should not get access to account by invalid email', async () => {
  //   const userInfo = await UserCreator.withInvalidCredentialsFromProperty();
  //
  //   loginPage
  //     .goToLoginPage();
  //
  //   await loginPage.waitEmailField();
  //
  //   loginPage
  //     .closeWelcomeModal()
  //     .enterEmail(userInfo.getEmail())
  //     .submitEmail();
  //
  //   await loginPage.waitErrorMessage();
  //
  //   const isFoundErrorMessage = await loginPage.getErrorMessage();
  //
  //   assert.strictEqual(isFoundErrorMessage, 'Проверьте правильность ввода');
  // });
});
