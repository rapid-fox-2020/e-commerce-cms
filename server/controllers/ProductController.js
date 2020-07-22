const { Product } = require('../models')

class ProductController {
    static list (req, res, next) {
        Product.findAll()
            .then(products => {
                return res.status(200).json(products)
            })
            .catch(err => {
                next (err)
            })
    }
    static create (req, res, next) {
        console.log('masuk create');
        console.log(req.body, 'req body <<<<<');
        const { name, image_url, price, stock } = req.body
        if (!name) {
            res.status(400).json({message: "name cannot be empty!"})
        }
        if (!image_url) {
            res.status(400).json({message: "image_url cannot be empty!"})
        }
        if (!price) {
            res.status(400).json({message: "price cannot be empty!"})
        }
        if (!stock) {
            res.status(400).json({message: "stock cannot be empty!"})
        }
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
                // return res.status(500).json({message: "internal server error"})
            })
    }
    static edit (req, res, next) {

    }
    static delete (req, res, next) {
        console.log('masuk delete');
        const id = req.params.id
        Product.findByPk(id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({message: "product not found"})
                } else {
                    data.destroy()
                        .then(results => {
                            return res.status(200).json(data)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    static findOne (req, res, next) {
        console.log('masuk findOne <<<<<');
        console.log(req.params, '<<< req params');
        const id = req.params.id
        Product.findByPk(id)
            .then(product => {
                if(!product) {
                    return res.status(404).json({message: "product not found"})
                } else {
                    return res.status(200).json(product)
                }
            })
            .catch(err => {
                console.log(err);
                next (err)
            })
    }
}

module.exports = ProductController