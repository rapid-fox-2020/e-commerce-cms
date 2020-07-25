const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function decodePassword(password, passwordFromDatabase) {
  return bcrypt.compareSync(password, passwordFromDatabase);
}

module.exports = { hashPassword, decodePassword };
