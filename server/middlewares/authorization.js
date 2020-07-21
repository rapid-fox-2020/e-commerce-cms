const { User } = require('../models')

const authorization = (req, res, next) => {

   User.findOne({ where: { id: req.userData.id } })
      .then(data => {
         if (data) {
            if (data.role == "admin") {
               next()
            } else {
               next({ name: "FORBIDDEN_ACCESS" })
            }
         } else {
            next({ name: "USER_NOT_FOUND" })
         }
      })
      .catch(err => {
         next(err)
      })
}

module.exports = authorization