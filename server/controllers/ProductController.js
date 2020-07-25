const { Product } = require('../models');

class ProductController {

    static findAll(req, res, next) {
        Product.findAll({
                order: [
                    [
                        'updatedAt', 'DESC'
                    ]
                ]
            })
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                next(err)
            })
    }

    static addProducts(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }
        Product.create(newProduct)
            .then((data) => {
                // emailSent(data)
                return res.status(201).json(data)
            }).catch((err) => {
                next(err)
            });
    }

    static getOneProduct(req, res, next) {
        const id = req.params.id

        Product.findByPk(id)
            .then((data) => {
                if (!data) {
                    next({ errCode: 'DATA_NOT_FOUND', message: "Product tidak di temukan" })
                } else {
                    return res.status(200).json(data);
                }
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        const id = req.params.id
        const updatedProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }
        Product.update(updatedProduct, {
                where: {
                    id
                },
                returning: true
            })
            .then((updateProduct) => {
                return res.status(200).json(updateProduct[1])
            }).catch((err) => {
                next(err)
            });
    }

    static destroy(req, res, next) {
        const id = req.params.id
        const Error = { errCode: "USER_NOT_FOUND", message: "Data Not Found" }
        let deleted
        Product.findByPk(id)
            .then((data) => {
                if (!data) {
                    throw Error
                        // return res.status(404).json({ message: "Data Not found" })
                } else {
                    deleted = data
                    return data.destroy()
                }
            })
            .then(result => {
                return res.status(200).json({ deleted })
            })
            .catch((err) => {
                next(err)
            });
    }

}

module.exports = ProductController;