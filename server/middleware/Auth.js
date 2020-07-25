const { encode, decode } = require('../helper/jwt');
const { Product, User } = require('../models')

module.exports = {
    //1. check apakah user punya akses token atau tidak
    authentication(req, res, next) {
        const access_token = req.headers.access_token
        if (!access_token) {
            next({ errCode: "TOKEN_NOT_FOUND", message: "Token is required" })
        } else {
            const userData = decode(access_token);
            req.userData = userData;
            User.findOne({
                    where: {
                        email: userData.email
                    }
                })
                .then((user) => {
                    if (user) {
                        console.log(userData, "Masuk ke authentication");
                        next();
                    } else {
                        next({ errCode: "USER_NOT_FOUND", message: "user is required" })
                    }
                }).catch((err) => {
                    next(err)
                });
        }
    },
    authorizationAdmin(req, res, next) {
        const email = req.userData.email
        User.findOne({ where: { email } })
            .then((user) => {
                if (!user) {
                    next({ errCode: "DATA_NOT_FOUND", message: "Data is not found !" })
                } else if (user.role == "Admin") {
                    console.log('masuk ke authorize');
                    next();
                } else {
                    next({ errCode: "FORBIDEN_ACCESS", message: "Not authorized or dont have access" });
                }
            }).catch((err) => {
                next(err)
            });
    }

}