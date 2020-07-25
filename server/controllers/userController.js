const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { encode } = require("../helpers/jwt");

class userController {
  static userLogin(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          next({ name: "INVALID_EMAIL" });
        } else {
          let compare = checkPassword(password, user.password);
          if (!compare) {
            next({ name: "INVALID_PASSWORD" });
          } else {
            let access_token = encode(user);
            let userInfo = {
              access_token,
              email,
            };
            res.status(200).json(userInfo);
            next();
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;
