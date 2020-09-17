const { Product } = require('../models')

function authorization (req, res, next) {
    console.log(req.params.id);
    const id = req.params.id
    Task.findByPk(id)
        .then(data => {
            // console.log(data);
            console.log(req.UserId);
            if(data.UserId === req.UserId) {
                return next()
            } else {
                throw {
                    type: "unauthentication",
                    message: "Not authroized to do the actions",
                    status: 401
                }
            }
        })
        .catch(err => {
            next({ name: 'Unauthorized' })
        })
}

module.exports = authorization