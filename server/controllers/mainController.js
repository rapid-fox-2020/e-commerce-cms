const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { encrypt, comparePass } = require('../helpers/bcrypt')
const { User } = require ('../models')

class MainController{
    static login ( req, res, next ){
        const loginData  = {
            email : req.body.email,
            password : req.body.password,
        }
        if(!loginData.email || loginData.email == "" ){
            return res.status(400).json({
                message: "email cannot be empty"
            })
        } else if(!loginData.password || loginData.password == ""){
            return res.status(400).json({
                message: "password cannot be empty"
            })
        }
        
        User.findOne ({ where : { email : loginData.email }})
        .then( result => {
            if( comparePass(loginData.password, result.password )) {
                const token = {
                    id: result.id,
                    email: result.email,
                }
                const access_token = jwtSign(token)
                return res.status(200).json({
                    access_token: access_token,
                    id: result.id
                })
            } else {
                return res.status(404).json({
                    message: "data not found"
                })
            }
        })
        .catch( err => {
            return res.status(404).json({
                message: "data not found"
            })
        })
    }
}

module.exports = MainController