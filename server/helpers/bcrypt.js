const bcrypt = require("bcrypt")


function hashPassword(userPassword, saltRounds){
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(userPassword, salt);
}


function checkPassword(inputPassword, dataPassword){
  return bcrypt.compareSync(inputPassword, dataPassword)
}


module.exports = { checkPassword, hashPassword }
