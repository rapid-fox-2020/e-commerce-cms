const {jwtSign, jwtVerify} = require('../helpers/jwt')
const { User, Product } = require('../models')

function authentication ( req, res, next ) {
    try {
        console.log(req.headers.access_token,"req.headers.access_token")
        req.userData = jwtVerify(req.headers.access_token)

        User.findByPk(req.userData.id)
        .then( data => {
            console.log("masuk then")
            if(data.role != "admin"){
                return res.status(401).json({message: "access only for admin"})
            } else {
                next()
            }
        })
        .catch( err => {
            console.log("masuk catch")
            return res.status(404).json({message: "user no longer exist"})
        })
    }catch {
        return res.status(401).json({message: "wrong access token"})
    }
}


function authorization ( req, res, next ) {
    const selectedId = req.params.id
    Product.findByPk(selectedId)
    .then( data => {
        if( data.UserId === req.userData.id){
            next()
        } else {
            res.status(401).json({message: "not authorized"})
        }
    })
    .catch( err => {
        res.status(404).json({message: "data not found"})
    })
}

module.exports = { authentication , authorization }