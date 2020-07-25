const { jwtVerify } = require("../helpers/jsonwebtoken");
const { User, Product } = require("../models");
const authentication = async function (req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "token not found" };
    } else {
      const checkData = jwtVerify(access_token);
      const verify = await User.findOne({ where: { email: checkData.email } });
      req.role = verify.role;

      next();
    }
  } catch (err) {
    next(err);
  }
};

const authorization = async function (req, res, next) {
  try {
    if (req.role !== "admin") {
      throw { name: "forbidden access" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
