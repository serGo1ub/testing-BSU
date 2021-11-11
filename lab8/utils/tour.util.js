const { driver } = require('../pages/TourPage');
const { By, until } = require('selenium-webdriver');
const tourSiteUrl = 'https://www.tez-tour.com/';

function waitTableHotels() {
    return driver.wait(until.elementLocated(By.css('#grid-list > tbody > tr')), 5000);
}

module.exports = {
    waitTableHotels,
    tourSiteUrl
};