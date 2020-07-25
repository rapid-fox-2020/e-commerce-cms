const { jwtSignIn } = require("../helpers/jsonwebtoken");
const { User } = require("../models");
const { decodePassword } = require("../helpers/bcrypt");
class UserController {
  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const checkEmail = await User.findOne({ where: { email: email } });
      if (!checkEmail) {
        throw { name: "email/password wrong" };
      } else {
        const checkPassword = decodePassword(password, checkEmail.password);
        if (!checkPassword) {
          throw { name: "email/password wrong" };
        } else {
          const encodeJWT = {
            email: checkEmail.email,
            role: checkEmail.role,
          };
          const access_token = jwtSignIn(encodeJWT);

          return res.status(200).json({ access_token: access_token });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
