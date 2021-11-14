const { driver } = require('../pages/TourPage');
const { By, until } = require('selenium-webdriver');
const tourSiteUrl = 'https://www.tez-tour.com/';

async function waitTableHotels() {
    return driver.wait(until.elementLocated(By.css('#grid-list > tbody > tr')));
}

module.exports = {
    waitTableHotels,
    tourSiteUrl
};
