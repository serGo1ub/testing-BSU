const Hotel = require('../models/Hotel.model');
const TestDataReader = require('./TestDataReader.service');
const environments = require('../constants/environment.constants');

class HotelCreator {

  static qa_HOTEL = 'qa.hotel.properties';
  static dev_HOTEL = 'dev.hotel.properties';

  static async withHotelInfoFromProperty() {
    const propertyName = process.argv[process.argv.length - 1].slice(1);
    console.log(process.argv[process.argv.length - 1]);
    const isPropertyNameExists = environments.includes(propertyName);
    if (isPropertyNameExists) {
      const obj = await TestDataReader.getTestData(this[`${ propertyName }_HOTEL`]);
      console.log(obj);
      return new Hotel(obj);
    }
    return new Hotel(await TestDataReader.getTestData(this[`${ environments[0] }_HOTEL`]));
  }

}

module.exports = HotelCreator;
