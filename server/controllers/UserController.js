const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {encode} = require('../helpers/jwt')
class UserController{
  static async login(req,res,nex){
    const data = {
      email:req.body.email,
      password:req.body.password
    }
    try {
      const userLogin = await User.findOne({where:{email:data.email}})
      if (userLogin && compare(data.password,userLogin.password)){
        const access_token = encode({email:userLogin.email,role:userLogin.role})
        res.status(200).json({message:"success login",access_token})
      }else{
        res.status(400).json({message:"email or password incorrect"})
      }      
    } catch (error) {
      res.status(500).json({message:'internal server error'})
    }
  }

}
module.exports = UserController