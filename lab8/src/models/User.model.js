class User {

  #email;
  #password;

  constructor({ email, password }) {
    this.#email = email;
    this.#password = password;
  }

  setEmail(email) {
    this.#email = email;
  }

  getEmail() {
    return this.#email;
  }

  setPassword(password) {
    this.#password = password;
  }

  getPassword() {
    return this.#password;
  }
}

module.exports = User;
