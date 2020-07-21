const {User} = require(`../models`)
const {decode} = require(`../helpers/jwt`)

const authentication = (req, res, next) => {
    let access_token = req.headers.access_token
    // console.log(access_token, `ini di auth`)
    let userData = decode(access_token)
    req.user = userData
    User.findByPk(userData.id)
    .then(result => {
        // console.log(result, `ini result di auth`)
        if (result) {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorization = (req, res, next) => {
    let access_token = req.headers.access_token
    // console.log(access_token, `ini di auth`)
    let userData = decode(access_token)
    let error = {
        name: `otherError`,
        statusCode: 403,
        message: `You don't have access to this.`
    }

    User.findByPk(userData.id) 
    .then(result => {
        // console.log(`ini abis di find`, result)
        if (result.role === `admin`) {
            next()
        } else {
            throw error
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authentication, authorization}