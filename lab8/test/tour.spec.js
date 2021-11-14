const TourForm = require('../pages/TourForm');
const assert = require('assert');
const { driver } = require('../pages/TourPage');
const { tourSiteUrl } = require('../utils/tour.util');
const { waitTableHotels } = require('../utils/tour.util');

describe('Test tour site', function () {
    this.timeout(0);

  beforeEach(function () {
    TourForm.goToTourSite(tourSiteUrl);
  });

  afterEach(async function () {
      driver && driver.quit();
  });

  it('Search hotel with correct validation', async function() {
    TourForm
      .closeWelcomeModal('#fancybox-close')
      .openHotelsTab('body > div.layout > div.content > div.index-page-block1 > div > div > div > ul > li:nth-child(2) > a')
      .setTourFormValues()
      .findHotels();

    await waitTableHotels();
    const isFoundHotel = TourForm.getFoundHotelsLength('#grid-list > tbody');

    assert.ok(isFoundHotel);
  })
})