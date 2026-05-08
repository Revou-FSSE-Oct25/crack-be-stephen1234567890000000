const { User } = require("../models/index");
const AuthServices = require("../services/auth.service");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthServices.register(name, email, password);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Registration failed",
        });
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const result = await AuthServices.login(email, password);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Login failed",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
