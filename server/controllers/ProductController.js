const { Product } = require('../models')

class ProductController {
    static postProduct(req, res) {
        const dataProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(dataProduct)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static productById(req, res) {
        Product.findByPk(req.params.id)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static listProduct(req, res) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteProduct(req, res) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json({ message: `Product with id ${req.params.id} successfully deleted` })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateProduct(req, res) {
        const dataProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(`masuk update`)

        Product.update(dataProduct, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                console.log('>>>>>>> masuk fetch data=')
                res.status(200).json({ message: `Product with id ${req.params.id} successfully updated` })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController