const { User } = require("../models")
const { checkPassword } = require("../helpers/bcrypt.js")
const { encode } = require('../helpers/jsonwebtoken.js');

class UserController {
  // static register(req,res,next){
  //   User.create({
  //     email : req.body.email,
  //     password : req.body.password,
  //     role: req.body.role
  //   })
  //   .then((data)=>{
  //     return res.status(201).json(data)
  //   })
  //   .catch((err)=>{
  //     return res.status(500).json({message: err})
  //   })
  // }
  static login(req,res,next){
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then((data)=>{
      if(!data){
        const errorMessage = {
          name: "NotFoundError",
          message: "Email not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      if(checkPassword(req.body.password, data.password)){
        const access_token = encode({id: data.id, email:data.email})
        return res.status(200).json({accessToken: access_token})
      }
      else{
        const errorMessage = {
          name: "ValidationError",
          message: "Password incorrect",
          statusCode:400
        }
        throw(errorMessage)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }
}


module.exports = UserController
