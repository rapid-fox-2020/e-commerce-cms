const { Product, User, sequelize } = require('../models')

class ProductController {
    static addPost (req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }
        
        Product.create(newProduct)
            .then((data) => {
                return res.status(201).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }

    static getProducts (req,res) {
        Product.findAll()
        
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getProductById (req, res, next) {
        const id = req.params.id

        Product.findByPk(id)
            .then((data) => {
                if (!data) {
                    throw {status: 404, name: "ErrorValidation", message:"Product not Found"}
                } else {
                    return res.status(200).json(data)
                }
            })
            .catch((err) => {
                next(err)
            })
    }
    
    static update (req, res, next) {
        const id = req.params.id
        const updateProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }

        Product.findByPk(id)
        .then((product) => {
            if (product) {
                return product.update(updateProduct)
            } else {
                throw { status: 404, message: 'Product not found', name: "ProductNotFound" }
            }
        })
        .then((data) => {
            return res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static destroy (req, res, next) {
        const id = req.params.id;
        let deleted;

        Product.findByPk(id)
            .then((data) => {
                deleted = data
                if (!data) {
                    throw {status: 404, name: "ErrorValidation", message:"Product not Found"}
                } else {
                    return data.destroy()
                }
            })
            .then((data) => {
                return res.status(200).json(deleted)
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = ProductController