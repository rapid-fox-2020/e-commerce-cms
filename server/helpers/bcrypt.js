const bcrypt = require('bcrypt');

function hashPassword(newPassword) {
  const hash = bcrypt.hashSync(newPassword, 8);
  return hash

}

function checkPassword(password, hash) {
  const compare = bcrypt.compareSync(password, hash);
  return compare
}


module.exports = {
  checkPassword,
  hashPassword
}