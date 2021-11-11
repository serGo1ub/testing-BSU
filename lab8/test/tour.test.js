const TourForm = require('../pages/TourForm');
const assert = require('assert');
const { driver } = require('../pages/TourPage');
const { tourSiteUrl } = require('../utils/tour.util');

describe('Test tour site', function(){

    beforeEach(function() {
        TourForm.goToTourSite(tourSiteUrl);
    });

    afterEach(function(){
        driver.quit();
    });

    it('Search hotels with correct validation', async function() {
        TourForm.closeWelcomeModal('#fancybox-close');
        TourForm.openHotelsTab('body > div.layout > div.content > div.index-page-block1 > div > div > div > ul > li:nth-child(2) > a');
        TourForm.setTourFormValues();
        await TourForm.findHotels();
        const isFoundHotels = !!(await TourForm.getFoundHotelsLength('#grid-list > tbody'));
        assert.ok(isFoundHotels);
    })
})