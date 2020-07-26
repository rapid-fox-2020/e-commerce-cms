const bcrypt = require('bcrypt');

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  },
  validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}