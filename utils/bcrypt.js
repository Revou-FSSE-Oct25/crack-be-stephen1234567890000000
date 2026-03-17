const bcrypt = require('bcryptjs');

const hashPassword = (plainText) => bcrypt.hashSync(plainText);

const comparePassword = (plainText, hash) => bcrypt.compareSync(plainText, hash);

module.exports = { hashPassword, comparePassword };
