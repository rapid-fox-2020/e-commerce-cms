module.exports = (err, _, res, __) => {
  let message = 'internal server error';
  let errCode = 500;
  // console.log(err.errors);
  switch (err.name) {
    case 'bad request':
      errCode = 400;
      message = err.message;
      break;
    case 'not authorized':
      errCode = 401;
      message = err.message;
      break;
    case 'not found':
      errCode = 404;
      message = err.message;
      break;
    case 'SequelizeValidationError':
      errCode = 400;
      message = err.errors[0].message;
      break;
    default:
      break;
  }
  return res.status(errCode).json(message);
}