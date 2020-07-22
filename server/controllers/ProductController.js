const { Product } = require('../models')

class ProductController {
    static list (req, res, next) {
        // Product.findAll()
    }
    static create (req, res, next) {
        console.log('masuk create');
        console.log(req.body, 'req body <<<<<');
        const { name, image_url, price, stock } = req.body
        // if (!name || !image_url || !price || !stock) {
        //     res.status(400).json({message: "name cannot be empty"})
        // }
        Product.create({
            name: name,
            image_url: image_url,
            price: price,
            stock: stock,
        })

            .then(newProduct => {
                console.log('masuk newProduct <<<<<');
                return res.status(201).json(newProduct)
            })
            .catch(err => {
                console.log(err, 'ini error <<<<');
                return res.status(500).json({message: "internal server error"})
            })
    }
    static edit (req, res, next) {

    }
    static delete (req, res, next) {

    }
    static findOne (req, res, next) {

    }
}

module.exports = ProductController