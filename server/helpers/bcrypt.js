const bcrypt = require('bcrypt')

function hashing(password){
  return bcrypt.hashSync(password,8)  
}
function compare(password,hash){
  return bcrypt.compare(password,hash)  
}

module.exports = {hashing,compare}