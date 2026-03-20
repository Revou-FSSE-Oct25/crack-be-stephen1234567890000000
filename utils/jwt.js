const jwt = require("jsonwebtoken");
const Module = require("module");
const SECRET_KEY = "secret";

const token = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
};

const bacaToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { token, bacaToken };
