const { User } = require(`../models`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

class UserController {
    static login(req, res) {
        // console.log(req.body, '<<<<<<<<<')
        const email = req.body.email
        const password = req.body.password

        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    res.status(401).json({ message: `invalid username or password` })
                } else {
                    const access_token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }, process.env.SECRET)
                    // console.log(access_token, `<<><><<`)

                    res.status(200).json({ access_token: access_token })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

}

module.exports = UserController