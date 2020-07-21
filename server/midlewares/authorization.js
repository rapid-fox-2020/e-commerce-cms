const { Product } = require('../models')

function authorization (req, res, next) {
    const id = req.params.id
    Product.findOne(id)
        .then(data => {
            // console.log(data);
            // console.log(req.UserId);
            if(data.UserId === req.UserId) {
                return next()
            }
        })
        .catch(err => {
            next({ name: 'Unauthorized' })
        })
}

module.exports = authorization