const jwt = require('jsonwebtoken')
const {User,Product} = require('../models')

const authentication = (req,res,next) => {
    const {token} = req.headers
    if(!token){
        res.status(404).json({msg: "Token not Found"})
    }
    try {
        var decode = jwt.verify(token,process.env.SECRET)
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(data => {
            if(data){
                next()
            } else {
                next({name: "NOT_FOUND_ERROR"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({msg: err.msg})
        })      
    } catch(err) {
        // console.log(err + '<<< auth')
        next(err)
    }
    
}

const authorization = (req,res,next) =>{
    const {id} = req.params
    Product.findByPk(id)
    .then(data => {
        if(!data){
            res.status(404).json({msg: "Product not found"})
        } else if(data.UserId !== req.userData.id){
            res.status(404).json({msg: "you are unauthorized"})
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authentication,authorization
}