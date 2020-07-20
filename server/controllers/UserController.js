const { User } = require('../models');
const { validatePassword } = require('../helpers/bcrypt');
const { encode } = require('../helpers/jwt');

class UserController {
  static async login(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        throw {
          name: 'not found',
          statusCode: 404,
          message: `Email "${req.body.email}" not registered. Please register first`
        }
      } else {
        if (user.role !== 'admin') {
          throw {
            name: 'not authorized',
            statusCode: 401,
            message: `Admin Only`
          }
        } else {
          if (validatePassword(req.body.password, user.password)) {
            const access_token = encode({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            });
            return res.status(200).json({
              id: user.id,
              name: user.name,
              email: user.email,
              access_token: access_token
            });
          } else {
            throw {
              name: 'bad request',
              statusCode: 400,
              message: 'password incorrect'
            }
          }
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;