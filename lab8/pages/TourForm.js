const { TourPage } = require ('./TourPage');
const { waitTableHotels } = require('../utils/tour.util');

class TourForm extends TourPage {

  _countryCode = '4106029';
  _hotelName = 'NESVIZH';
  _hotelRateCode = '2567';
  _pansionCode = '15350';

  isTourFormComplete = false;

  setTourFormValues() {
    this.chooseCountry(this._countryCode);
    this.enterTextByCss('#hotelname', this._hotelName);
    this.chooseHotelLevel(this._hotelRateCode);
    this.choosePansion(this._pansionCode);
    this.isTourFormComplete = true;
  }

  async findHotels() {
    if (this.isTourFormComplete) {
      this.clickByCss('#hs-form > div.search-btn-point > input');
      this.isTourFormComplete = false;
      await waitTableHotels();
    }
  }
}

module.exports = new TourForm();
