function errorHandler (err, req, res, next) {
    let status;
    let message;
    console.log(err, 'err di handler <<<<<');
    switch (err.type) {
        case "EmptyField":
            res.status(err.status).json({message: err.message})
            break;
        case "unauthentication":
            res.status(err.status).json({message: err.message})
            break;
        case "NotFound":
            res.status(err.status).json({message: err.message})
            break;
        case "ValidationError":
            res.status(err.status).json({message: err.message})
            break;
    
        default:
            break;
    }
    return res.status(err.status).json({message: err.message})
}

module.exports = errorHandler