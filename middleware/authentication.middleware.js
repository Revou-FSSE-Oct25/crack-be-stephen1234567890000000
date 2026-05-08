const { token, bacaToken } = require("../utils/jwt");
const { User } = require("../models/index");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw {
        statusCode: 401,
        message: "Authorization header is missing",
      };
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw {
        statusCode: 401,
        message: "Token is missing",
      };
    }

    const decoded = bacaToken(token);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
