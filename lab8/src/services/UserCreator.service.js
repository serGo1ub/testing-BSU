const User = require('../models/User.model');
const TestDataReader = require('./TestDataReader.service');

class UserCreator {

  static INVALID_LOGIN = 'login.invalid.properties';

  static async withInvalidCredentialsFromProperty() {
    return new User(await TestDataReader.getTestData(this.INVALID_LOGIN));
  }

}

module.exports = UserCreator;
