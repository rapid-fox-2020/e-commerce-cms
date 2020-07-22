const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        console.log('masukkkk');
        if (!req.body.email) {
            return res.status(404).json({message: "email cannot be empty"})
        }
        if (!req.body.password) {
            return res.status(404).json({message: "password cannot be empty"})
        }
        User.findOne({
            where: { email: req.body.email}
        })
            .then(data => {
                console.log('masuk lagi <<<<');
                if (!data) {
                    
                    // const errorMessage = {
                    //     name: "NotFoundError",
                    //     message: "Email not Found",
                    //     statusCode: 404,
                    // }
                    // throw errorMessage
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
                    const errorMessage = {
                        name: "ValidationError",
                        message: "Password incorrect",
                        statusCode: 401,
                    }
                    throw errorMessage
                }
            })
            .catch(err => {
                console.log(err, '<<<<< error catch');
                next(err)
            })
    }
}

module.exports = UserController