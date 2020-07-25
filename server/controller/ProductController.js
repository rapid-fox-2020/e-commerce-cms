const {Product} = require('../models')

class ProductController {
    static addProduct(req,res,next){
        let obj = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img_url: req.body.img_url,
            UserId: req.userData.id
        }
        Product.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static List(req,res,next){
        Product.findAll({where: {
            UserId: req.userData.id
        }})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static ListbyID(req,res,next){
        Product.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static updateProduct(req,res,next){
        let obj = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img_url: req.body.img_url
        }
        Product.update(obj,{where: {
            id: req.params.id
        }})
        .then(data => {
            return Product.findByPk(req.params.id)
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static deleteColumn(req,res,next){
        Product.destroy({where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({msg: "Deleted"})
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }
}

module.exports = ProductController