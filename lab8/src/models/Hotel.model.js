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

  setCountryCode(countryCode) {
    this.#countryCode = countryCode;
  }

  getCountryCode() {
    return this.#countryCode;
  }

  setHotelName(hotelName) {
    this.#hotelName = hotelName;
  }

  getHotelName() {
    return this.#hotelName;
  }

  setHotelRateCode(hotelRateCode) {
    this.#hotelRateCode = hotelRateCode;
  }

  getHotelRateCode() {
    return this.#hotelRateCode;
  }

  setPansionCode(pansionCode) {
    this.#pansionCode = pansionCode;
  }

  getPansionCode() {
    return this.#pansionCode;
  }

}

module.exports = Hotel;
