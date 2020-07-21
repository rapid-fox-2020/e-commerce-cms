function errorHandler(err, req, res, next) {

  switch (err.name) {
    case "SequelizeValidationError":
      const message = []
      err.errors.forEach(item => {
        message.push(item.message)
      });
      return res.status(400).json({ message })
    case 'CustomValidation':
      return res.status(err.statusCode).json({ message: err.message })
    default:
      return res.status(500).json({ message: 'Internal server error' })
  }


}

module.exports = errorHandler