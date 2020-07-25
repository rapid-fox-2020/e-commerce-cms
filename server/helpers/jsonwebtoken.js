var jwt = require("jsonwebtoken");
const SECRETKEY = "e-commerce_apps";

function jwtSignIn(input) {
  var token = jwt.sign(input, SECRETKEY);
  return token;
}

function jwtVerify(input) {
  var decoded = jwt.verify(input, SECRETKEY);
  return decoded;
}

module.exports = { jwtSignIn, jwtVerify };
