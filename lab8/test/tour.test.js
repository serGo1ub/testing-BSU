const TourForm = require('../pages/TourForm');
const assert = require('assert');
const { driver } = require('../pages/TourPage');
const { tourSiteUrl } = require('../utils/tour.util');
const { waitTableHotels } = require('../utils/tour.util');
const { By, until } = require('selenium-webdriver');

describe('Test tour site', function(){
    // this.timeout(50000);

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
        TourForm.findHotels();

        const isFoundHotels = !!(await driver.wait(until.elementLocated(By.css('#grid-list > tbody')))
        .findElements(By.css('tr'))
            .then(function(hotels){
            return hotels.length;
        }));
        driver.manage().setTimeouts({implicit: (5000)});

        // console.log('hotels', hotels);
        // const isFoundHotels = !!(await TourForm.getFoundHotelsLength('#grid-list > tbody'));
        assert.ok(isFoundHotels);
    })
})