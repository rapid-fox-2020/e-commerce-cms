const { decode } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
  async authentication(req, _, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) {
        throw {
          name: 'bad request',
          statusCode: 400,
          message: 'token needed'
        }
      } else {
        req.userData = decode(access_token);
        req.userData = await User.findOne({ where: { email: req.userData.email } });
        if (req.userData) {
          next();
        } else {
          throw {
            name: 'bad request',
            statusCode: 400,
            message: 'incorrect token'
          };
        }
      }
    } catch (e) {
      next(e);
    }
  },
  async authorization(req, _, next) {
    try {
      if (req.userData.role === 'admin') {
        next();
      } else {
        throw {
          name: 'not authorized',
          statusCode: 401,
          message: 'not authorized'
        };
      }
    } catch (e) {
      next(e);
    }
  }
}