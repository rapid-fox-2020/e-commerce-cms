const { decode } = require("../helpers/jsonwebtoken.js")
const { User } = require("../models")

const userAuthentication = (req,res,next)=>{
  let accessToken = req.headers.token
  if(!accessToken){
    const errorMessage = {
      name: "ValidationError",
      message: "Token Not Found",
      statusCode: 400
    }
    throw(errorMessage)
  }
  else{
    let dataUser = decode(accessToken)
    if(dataUser.message){
      const errorMessage = {
        name: "ValidationError",
        message: "Invalid Token",
        statusCode: 400
      }
      throw(errorMessage)
    }
    else{
      req.userData = dataUser
      return User.findOne({
        where:{
          email: dataUser.email
        }
      })
    .then((data)=>{
      if(!data){
        const errorMessage = {
          name: "Forbidden Access",
          message: "You dont have permission to access this page/features",
          statusCode:403
        }
        throw(errorMessage)
      }
      else{
        next()
      }
    })
    .catch((err)=>{
      next(err)
    })
  }
  }
}


const userAuthorization = (req,res,next)=>{
  let userEmail = req.userData.email
  User.findOne({
    where:{
      email:userEmail
    }
  })
  .then(data=>{
    if(data.role === "Admin"){
      next()
    }
    else{
      const errorMessage = {
        name: "Forbidden Access",
        message: "You dont have permission to access this page/features",
        statusCode:403
      }
      throw(errorMessage)
    }
  })
  .catch((err)=>{
    next(err)
  })
}

module.exports = { userAuthentication, userAuthorization }
