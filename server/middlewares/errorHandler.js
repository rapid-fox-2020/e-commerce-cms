"use strict"

function errorHandler(err, req, res, next) {
    if(err.name === "SequelizeValidationError") {
        const errMessages = []
        for (let i = 0; i < err.errors.length; i++) {
            errMessages.push(err.errors[i].message)
        }
        if(errMessages[0] !== "Validation min on price failed") {
            return res
            .status(400)
            .json({message: "Validation Error", errors: errMessages})
        } else if (errMessages[0] === "Validation min on price failed") {
            return res
            .status(400)
            .json({message: "Validation Error", errors: "Price cannot be a negative value!"})
        } else if (errMessages[0] === "Validation min on stock failed") {
            return res
            .status(400)
            .json({message: "Validation Error", errors: "Stock cannot be 0!"})
        }
    } else if(err.name === "SequelizeUniqueConstraintError"){
        const errMessages = []
        for (let i = 0; i < err.errors.length; i++) {
            errMessages.push(err.errors[i].message)
        }
        return res
        .status(400)
        .json({message: "Validation Error", errors: "Email with the same name already registered!"})
    } else if(err.name === "Validation_error"){
        return res.status(err.statusCode).json({message: err.message})
    } else if(err.name === "JsonWebTokenError"){
        return res.status(401).json({message: "Token is Not Valid!"})
    } else {
        console.log(err)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = errorHandler