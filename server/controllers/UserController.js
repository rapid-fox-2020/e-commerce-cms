const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        console.log('masukkkk');
        let message;
        if (!req.body.email) {
            message = "email cannot be empty"
        }
        if (!req.body.password) {
            message = "password cannot be empty"
        }if (message) {
            throw {
                status: 404,
                type: "EmptyFied",
                message: message
            }
        }
        User.findOne({
            where: { email: req.body.email}
        })
            .then(data => {
                console.log('masuk lagi <<<<');
                if (!data) {
                    throw {
                        status: 404,
                        type: "NotFound",
                        message: "email not found"
                    }
                }
                if (checkPassword(req.body.password, data.password)) {
                    console.log("masuk cek pasword <<<<");
                    const access_token = encode ({
                        id: data.id,
                        email: data.email
                    })
                    return res.status(200).json({ access_token })
                } else {
                    console.log('masuk else cek password <<<');
                    throw {
                        type: "ValidationError",
                        message: "Password incorrect",
                        statusCode: 401,
                    }
                }
            })
            .catch(err => {
                // console.log(err, '<<<<< error catch');
                next(err)
            })
    }
    static register (req, res, next) {
        const { email, password, role } = req.body
        User.create({
            email: email,
            password: password,
            role: role
        })
            .then(newUser => {
                console.log('masuk create');
                res.status(201).json(newUser)
            })
            .catch(err => {
                next (err)
            })
    }
}

module.exports = UserController