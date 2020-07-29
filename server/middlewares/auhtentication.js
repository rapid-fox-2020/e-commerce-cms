const { decode } = require('../helper/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  const access_token = req.headers.access_token
  try {
    if (!access_token) {
      throw {
        statusCode: 404,
        name: "CustomValidation",
        message: "Data not found"
      }
    }

    const UserData = decode(access_token)
    req.UserData = UserData;

    const user = await User.findOne({ where: { email: UserData.email } })

    if (user) {
      next()
    } else {
      throw {
        statusCode: 401,
        name: "CustomValidation",
        message: "Please Login"
      }
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = authentication