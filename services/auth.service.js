const { where } = require("sequelize");
const { User } = require("../models/index");
const { token } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");

class AuthServices {
  static async register(name, email, password) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw {
        statusCode: 400,
        message: "Email already exists",
      };
    }

    const newUser = await User.create({ name, email, password });

    if (!newUser.name) {
      throw {
        statusCode: 400,
        message: "Name is required",
      };
    }

    if (!newUser.email) {
      throw {
        statusCode: 400,
        message: "Email is required",
      };
    }

    if (!newUser.password) {
      throw {
        statusCode: 400,
        message: "Password is required",
      };
    }

    const accessToken = token({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      accessToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  static async login(email, password) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    const isPasswordvalid = comparePassword(password, user.password);

    if (!isPasswordvalid) {
      throw {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    const accesstoken = token({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { accesstoken };
  }
}

module.exports = AuthServices;
