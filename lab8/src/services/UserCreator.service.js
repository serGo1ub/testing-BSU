const User = require('../models/User.model');
const TestDataReader = require('./TestDataReader.service');

class UserCreator {

  static INVALID_LOGIN = 'login.invalid.properties';
  // static VALID_LOGIN = 'login.valid.properties';

  static async withInvalidCredentialsFromProperty() {
    return new User(await TestDataReader.getTestData(this.INVALID_LOGIN));
  }

  // static async withValidCredentialsFromProperty() {
  //   return new User(await TestDataReader.getTestData(this.VALID_LOGIN));
  // }

}

module.exports = UserCreator;
