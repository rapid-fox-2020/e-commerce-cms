const {User} = require('../models')
const { response } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{

    static register(req, res, next) {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
        };
        User.create(newUser)
          .then((response) => {
            res.status(201).json({
              message: "Success Register"
            });
          })
          .catch((err) => {
            // console.log(err);
            next(err)
          });
      }
      
      static login(req,res,next){
        const email = req.body.email
        const password = req.body.password

        User.findOne({where: {email: email}})
        .then((data) => {
            if(bcrypt.compareSync(password,data.password)){
                const token = jwt.sign({
                    id: data.id,
                    email: data.email
                },process.env.SECRET)
                res.status(200).json({
                    token: token
                })
            } else {
                res.status(400).json({
                    msg: "invalid Email or Password"
                })
            }
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

}
module.exports = UserController