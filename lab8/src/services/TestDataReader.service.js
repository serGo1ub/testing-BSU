const fs = require('fs/promises');

class TestDataReader {

  static async getTestData(fileName) {
    console.log(fileName);
    return (await fs.readFile(`./resources/${ fileName }`, 'utf-8'))
      .toString()
      .split('\r\n')
      .reduce((queryInfo, resourceString) => {
      if (resourceString.length > 0) {
        const [fieldName, fieldValue] = resourceString.split('=');
        queryInfo[fieldName] = fieldValue;
      }
      return queryInfo;
    }, {});
  }

}

module.exports = TestDataReader;
