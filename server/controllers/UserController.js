const { User } = require('../models');
const { encode } = require('../helper/jwt')
const { checkPassword } = require('../helper/bcrypt')

class UserController {

    // static register(req, res, next) {
    //     const form = {
    //         email: req.body.email,
    //         password: req.body.password,
    //         role: "Admin"
    //     };
    //     return User.create(form)
    //         .then((dataUser) => {
    //             const access_token = encode(dataUser.id, dataUser.email);
    //             return res.status(201).json({ id: dataUser.id, email: dataUser.email, password: dataUser.password, access_token });
    //         }).catch((err) => {
    //             next(err)
    //         });
    // }

    static async login(req, res, next) {
        const email = req.body.email
        try {
            const dataUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!dataUser) {
                next({ errCode: "INVALID_EMAIL", message: "invalid username and password" })
            } else {
                const password = req.body.password;
                if (checkPassword(password, dataUser.password)) {
                    const access_token = encode(dataUser.id, dataUser.email);
                    return res.status(200).json({
                        access_token,
                        email: dataUser.email
                    })
                } else {
                    next({ errCode: "INVALID_EMAIL", message: "invalid username and password" })

                }
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

}

module.exports = UserController;