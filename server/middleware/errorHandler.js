function errorHandler(err,req,res, next){
    let statusCode = ''
    let errorMsg = ''
    let errorCode = ''

    console.log(err)
    switch(err.name){
        case 'TOKEN_ERROR':
            statusCode = 404
            errorCode = err.name
            errorMsg = 'Token not found'
            break
        case 'NOT_FOUND_ERROR':
            statusCode = 404
            errorCode = 'NOT_FOUND_ERROR'
            errorMsg = err.msg ||'Data not found'
            break
        case 'JsonWebTokenError':
        case 'AUTHENTICATION_ERROR':
            statusCode = 401
            errorCode = err.name
            errorMsg = 'AUTHENTICATION ERROR'
            break
        case 'SequelizeValidationError':
            statusCode = 400
            errorCode = 'VALIDATION ERROR'
            
            const validationErrors = []

            err.errors.forEach(e => {
                validationErrors.push(e.message)
            });

            errorMsg = validationErrors
            break
        default: 
        statusCode = 500
        errorMsg = 'internal error server'
        errorCode = 'internal_error_server'
    }

    res.status(statusCode).json({
        errorCode,
        msg: errorMsg
    })
}

module.exports = errorHandler