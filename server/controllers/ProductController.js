"use strict"

const {Product} = require('../models')

class ProductController {
    static show (req, res, next) {
        Product.findAll({
            order:[['createdAt', 'ASC']],
        })
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            next(err)
        })
    }
    static add (req, res, next) {
        let newProduct =  {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(newProduct)
        .then(function(data){
            return res.status(201).json(data)
        })
        .catch(function(err){
            next(err)
        })
    }
    static getId (req, res, next) {
        const id = +req.params.id
        Product.findByPk(id)
        .then(function(data){
            if (!data) {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Product with ID: ${id} is not found!`
                }
            } else {
                return res.status(200).json(data)
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static edit (req, res, next) {
        const id = +req.params.id
        let updateProduct =  {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(updateProduct, {where: {id}})
        .then(function(data){
            if (data[0] === 1) {
                return res.status(200).json({message: 'Succesfully Updated Product!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Product is not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static delete (req, res, next) {
        const id = +req.params.id
        Product.destroy({ where: {id} })
        .then(function(data){
            if (data) {
                return res.status(200).json({message: 'Succesfully Deleted Product!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Product with ID: ${id} is not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
}

module.exports = ProductController