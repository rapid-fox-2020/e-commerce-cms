function errorHandler (err,req, res,next) {
  let statusCode
  let message
  switch(err.name){
    case "SequelizeValidationError":
      message = []
      err.errors.forEach((item)=>{message.push(item.message)})
      statusCode = 400
    break;

    case "ValidationError":
      message = err.message
      statusCode = err.statusCode
    break;

    case "NotFoundError":
      message = err.message
      statusCode = err.statusCode
    break;

    case "Forbidden Access":
      message = err.message
      statusCode = err.statusCode
    break;

    default:
      message = "Internal Server Error"
      statusCode = 500
    break;
  }
  res.status(statusCode).json({ message })
}


module.exports = errorHandler
