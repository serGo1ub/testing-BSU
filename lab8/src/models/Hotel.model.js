class Hotel {

  #countryCode;
  #hotelName;
  #hotelRateCode;
  #pansionCode;

  constructor({ countryCode, hotelName, hotelRateCode, pansionCode }) {
    this.#countryCode = countryCode;
    this.#hotelName = hotelName;
    this.#hotelRateCode = hotelRateCode;
    this.#pansionCode = pansionCode;
  }

  getCountryCode() {
    return this.#countryCode;
  }

  getHotelName() {
    return this.#hotelName;
  }

  getHotelRateCode() {
    return this.#hotelRateCode;
  }

  getPansionCode() {
    return this.#pansionCode;
  }

  setCountryCode(countryCode) {
    this.#countryCode = countryCode;
  }

  setHotelName(hotelName) {
    this.#hotelName = hotelName;
  }

  setHotelRateCode(hotelRateCode) {
    this.#hotelRateCode = hotelRateCode;
  }

  setPansionCode(pansionCode) {
    this.#pansionCode = pansionCode;
  }

}

module.exports = Hotel;
