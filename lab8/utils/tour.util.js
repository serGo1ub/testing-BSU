const { driver } = require('../pages/TourPage');
const { By, until } = require('selenium-webdriver');
const tourSiteUrl = 'https://www.tez-tour.com/';

async function waitTableHotels() {
    const query = await driver.wait(until.elementLocated(By.css('#grid-list > tbody')));
    return query.findElements(By.css('tr')).then(function(hotels){
        return hotels.length;
    });
    
}

module.exports = {
    waitTableHotels,
    tourSiteUrl
};