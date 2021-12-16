const assert = require('assert');
const TezTourMainPage = require('../pages/TezTourMain.page');
const Driver = require('../driver/Driver');
const HotelCreator = require('../services/HotelCreator.service');

describe('Test tour main page', function () {

  let driver;
  let tezTourMainPage;

  beforeEach(async function () {
    driver = await Driver.getDriver();
    tezTourMainPage = new TezTourMainPage(driver);
  });

  afterEach(async function () {
    await Driver.closeDriver();
  });

  it('Should get certain hotel', async function () {
    const hotelInfo = await HotelCreator.withHotelInfoFromProperty();

    tezTourMainPage
      .goToTourSite();

    await tezTourMainPage.waitWelcomeModal();

    tezTourMainPage
      .closeWelcomeModal()
      .openHotelsTab()
      .setTourFormValues(hotelInfo)
      .findHotels();

    await tezTourMainPage.waitTableHotels();
    const isFoundHotel = await tezTourMainPage.getFoundHotelName(hotelInfo.getHotelName().length);
    assert.strictEqual(isFoundHotel, hotelInfo.getHotelName());
  });

  it('Should change our geolocation to Voronezh', async function() {
    tezTourMainPage
      .goToTourSite();

    await tezTourMainPage.waitWelcomeModal();

    tezTourMainPage
      .closeWelcomeModal()
      .openGeolocationMenu();

    await tezTourMainPage.waitGeolocationMenu();

    tezTourMainPage
      .changeGeolocationToVoronezh();

    await tezTourMainPage.waitGeolocationButton();

    const geolocation = await tezTourMainPage.getGeolocation();

    assert.strictEqual(geolocation, 'Воронеж');
  });

})
