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
        let message = null
        try {
            const { name, image_url, description, genre, price, stock } = req.body
            if (!name) {
                message = "name cannot be empty!"  
            }
            if (!image_url) {
                message = "image_url cannot be empty!"
            }
            if (!description) {
                message = "description cannot be empty!" 
            }
            if (!genre) {
                message = "genre cannot be empty!" 
            }
            if (!price) {
                message = "price cannot be empty!" 
            }
            if (!stock) {
                message = "stock cannot be empty!" 
            }
            if (message) {
                throw {
                    status: 400,
                    type: "EmptyField",
                    message: message
                }
            }
            Product.create({
                name: name,
                image_url: image_url,
                description: description,
                genre: genre,
                price: price,
                stock: stock,
                UserId: req.UserId
            })
                .then(newProduct => {
                    console.log('masuk newProduct <<<<<');
                    return res.status(201).json(newProduct)
                })
                .catch(err => {
                    console.log(err, 'ini error <<<<');
                    throw err
                    // return res.status(500).json({message: "internal server error"})
                })
        } catch(err) {
            next(err)
        }
    }
    static edit (req, res, next) {
        const id = req.params.id
        let message = null;
        try {
            const { name, image_url, description, genre, price, stock } = req.body
            if (!name) {
                message = "name cannot be empty"  
            }
            if (!image_url) {
                message = "image_url cannot be empty"
            }
            if (!price) {
                message = "price cannot be empty" 
            }
            if (!stock) {
                message = "stock cannot be empty" 
            }
            if (message) {
                throw {
                    status: 400,
                    type: "EmptyField",
                    message: message
                }
            }
            Product.findByPk(id)
                .then(product => {
                    if (product) {
                        product.update({
                            name: name,
                            image_url: image_url,
                            description: description,
                            genre: genre,
                            price: price,
                            stock: stock,
                        })
                        return res.status(200).json(product)
                    } else {
                        throw {
                            status: 404,
                            type: "NotFound",
                            message: "product not found"
                        }
                    }
                })
                .catch(err => {
                    next(err)
                })
        } catch (err) {
            next (err)
        }
    }
    static delete (req, res, next) {
        console.log('masuk delete');
        const id = req.params.id
        Product.findByPk(id)
            .then(data => {
                if (!data) {
                    throw {
                        status: 404,
                        type: "NotFound",
                        message: "product not found"
                    }
                    // return res.status(404).json({message: "product not found"})
                } else {
                    data.destroy()
                        .then(results => {
                            return res.status(200).json(data)
                        })
                        .catch(err => {
                            next (err)
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                next (err)
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
                    throw {
                        status: 404,
                        type: "NotFound",
                        message: "product not found"
                    }
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