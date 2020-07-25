const { User } = require('../models')
const { encode } = require('../helper/jwt')
const { checkPassword } = require('../helper/bcrypt')

class UserController {


  static register(req, res, next) {

  }

  static login(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email } })
      .then((data) => {
        if (!data) {
          throw {
            statusCode: 400,
            name: "CustomValidation",
            message: "email or password incorrect"
          }
        } else {
          if (checkPassword(password, data.password)) {
            const token = encode({
              id: data.id,
              email: data.email
            })
            return res.status(200).json({ access_token: token })
          } else {
            throw {
              statusCode: 400,
              name: "CustomValidation",
              message: "email or password incorrect"
            }
          }
        }
      })
      .catch((err) => {
        next(err)
      })
  }

}

module.exports = UserController