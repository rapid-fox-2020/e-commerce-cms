const { User } = require('../models')

const authorization = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.UserData.id } })

    if (!user) {
      throw {
        statusCode: 404,
        name: "CustomValidation",
        message: "Data not found"
      }
    }

    if (user.role === "Admin") {
      next()
    } else {
      throw {
        statusCode: 403,
        name: "CustomValidation",
        message: 'Forbidden Access'
      }

    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization 