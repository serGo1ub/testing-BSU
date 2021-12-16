const Driver = require("../driver/Driver");
const TouristTour = require("../pages/TouristTour.page");
const assert = require("assert");

describe('Test tourist page', () => {

  let driver;
  let touristTour;

  beforeEach(async function () {
    driver = await Driver.getDriver();
    touristTour = new TouristTour(driver);
  });

  afterEach(async function () {
    await Driver.closeDriver();
  });


  it('Should get tours to Turkey', async function() {
    touristTour.goToTouristPage()

    await touristTour.waitCountryTourInput();

      touristTour.writeCountryNameTour('Турция');


    await touristTour.waitCountryTourList();

      touristTour.chooseCountryTour().findTours();

      await touristTour.waitCountryToursResult();

      const toursResult = await touristTour.getTourListResult();

      assert.strictEqual(toursResult, "Туры в Турцию");

  });

  it('Should get excursion from Vena', async function () {
    touristTour.goToTouristPage();

    await touristTour.waitExcursionTab();

    touristTour.openExcursionTab();

    await touristTour.waitExcursionInput();

    touristTour.writeExcursion('Вена');

    await touristTour.waitExcursionsMenuToVena();

    touristTour.chooseExcursionToVena().findExcursions();

    await touristTour.waitExcursionsTable();

    const isExcursionsToVena = await touristTour.getExcursionsToVena();
    // console.log(excursionsToVena);
    assert.ok(isExcursionsToVena);
  });

  it('Should not get excursions with wrong excursion field', async function() {
    const wrongExcursionName = '---';
    touristTour.goToTouristPage();

    await touristTour.waitExcursionTab();

    touristTour.openExcursionTab();

    await touristTour.waitExcursionInput();

    touristTour.writeExcursion(wrongExcursionName);

    touristTour.findExcursions();

    const excursionsInputValue = await touristTour.getExcursionsInputValue();

    assert.strictEqual(wrongExcursionName, excursionsInputValue);
  });

  it('Should get empty favorite list by default', async function() {
    touristTour.goToTouristPage();

    await touristTour.waitFavoriteButton();

    touristTour.openFavoriteList();

    // await driver.sleep(5000);
    await touristTour.waitFavoriteList();

    const favoriteList = await touristTour.getFavoriteListValue();
    // console.log(vv);

    assert.ok(favoriteList.includes("Добавляйте понравившиеся туры"));
  });

  it('Should change current currency to USD', async function() {
    touristTour
      .goToTouristPage();
    //
    // await touristTour.waitCurrencyButton();
    //
    touristTour
      .openCurrencyMenu()
      .changeCurrencyToUSD();

    await touristTour.waitCurrencyButton();

    const currency = await touristTour.getCurrentCurrency();

    console.log('curr', currency);
    assert.strictEqual(currency, 'USD');
  });
});
