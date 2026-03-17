const {User} = require("../models/index");

class AuthServices {
  static async register(name, email, password) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw {
        statusCode: 400,
        message: "Email already exists",
      }
    }

    const newUser = await User.create({name, email, password});
  }
}

module.exports = AuthServices;