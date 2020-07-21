module.exports = function (err, req, res, next) {
   let statusCode = 500
   let message = "Internal Server Error"

   switch (err.name) {
      case "SequelizeValidationError":
         message = []
         err.errors.forEach(error => {
            message.push(error.message)
         })
         statusCode = 400
         break
      case "SequelizeUniqueConstraintError":
         message = []
         err.errors.forEach(error => {
            message.push(error.message)
         })
         statusCode = 400
         break
      case "ValidationError":
         message = "Token not Found"
         statusCode = 401
         break
      case "JsonWebTokenError":
         message = "Token is invalid"
         statusCode = 401
         break
      case "FORBIDDEN_ACCESS":
         message = "Forbidden Access"
         statusCode = 403
         break
      case "NOT_LOGGED_IN":
         message = "Please Login"
         statusCode = 401
         break
      case "INVALID_EMAIL":
         message = "Invalid Email"
         statusCode = 400
         break
      case "INVALID_PASSWORD":
         message = "Invalid Password"
         statusCode = 400
         break
      case "EMAIL_ALREADY_EXIST":
         message = "Email Already Exist"
         statusCode = 400
         break
      case "ACCESS_TOKEN_NOT_FOUND":
         message = "Token not found"
         statusCode = 400
         break
      case "DATA_NOT_FOUND":
         message = "Data not found"
         statusCode = 404
         break
      case "USER_NOT_FOUND":
         message = "User not found"
         statusCode = 404
         break
   }
   return res.status(statusCode).json({ message: message })
}