require('dotenv').config();
const jwt = require("jsonwebtoken");
const Module = require("module");
const SECRET_KEY = process.env.JWT_SECRET;

const token = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
};

const bacaToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { token, bacaToken };
