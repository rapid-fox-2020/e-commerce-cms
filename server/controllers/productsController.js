const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { Product } = require ('../models')

class ProductsController{
    static add(req,res, next){
        // console.log(req.body,"newOnenewOne")
        let newOne = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }

        if(!newOne.name || newOne.name == "" ){
            return res.status(400).json({
                message: "name cannot be empty"
            })
        } else if(!newOne.image_url || newOne.image_url == "" ){
            return res.status(400).json({
               message: "image_url cannot be empty"
           })
        } else if (!newOne.price || newOne.price == "" ){
            return res.status(400).json({
              message: "price cannot be empty"
          })
        } else if(!newOne.stock || newOne.stock == ""){
            return res.status(400).json({
                message: "stock cannot be empty"
            })
        }else if ( typeof newOne.price != "number" || typeof newOne.stock != "number" ){
            return res.status(400).json({
                message: "Price and Stock must be a Number"
            })
        } else if ( newOne.price <= 0 || newOne.stock <= 0 ){
            return res.status(400).json({
                message: "Price and Stock must be more then 0"
            })
        }

        Product.create(newOne)
        .then( data => {
            console.log(data,"datadata")
            return res.status(201).json(data)
        })
        .catch ( err => {
            console.log(err,"errerr")

            return res.status(500).json(err)
        })

    }

    static view(req,res, next){
        Product.findAll()
        .then( data => {
            // data.dataValues.createdAt = toString(data.dataValues.createdAt) 
            // data.dataValues.updatedAt = toString(data.dataValues.updatedAt)
            // console.log(data.dataValues,"data.dataValuesdata.dataValues")
            return res.status(200).json(data)
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })

    }

    static viewByPk(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "data not found"
                })
            } else {
                return res.status(200).json(data)
            }
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static update(req,res, next){
        const selectedId = req.params.id

        let newData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }

        if(!newData.name || newData.name == "" ){
            return res.status(400).json({
                message: "name cannot be empty"
            })
        } else if(!newData.image_url || newData.image_url == "" ){
            return res.status(400).json({
               message: "image_url cannot be empty"
           })
        } else if (!newData.price || newData.price == "" ){
            return res.status(400).json({
              message: "price cannot be empty"
          })
        } else if(!newData.stock || newData.stock == ""){
            return res.status(400).json({
                message: "stock cannot be empty"
            })
        }else if ( typeof newData.price != "number" || typeof newData.stock != "number" ){
            return res.status(400).json({
                message: "Price and Stock must be a Number"
            })
        } else if ( newData.price <= 0 || newData.stock <= 0 ){
            return res.status(400).json({
                message: "Price and Stock must be more then 0"
            })
        }

        Product.findByPk(selectedId)
        .then( data => {
            if ( data == null ) {
                return res.status(404).json({
                    message: "data not found"
                }) 
            } else {
                data.update(newData)
                .then ( updatedRow => {
                    res.status(201).json(data)
                })
                .catch ( err =>{
                    next(err)
                })
            }
            // data.dataValues.createdAt = toString(data.dataValues.createdAt) 
            // data.dataValues.updatedAt = toString(data.dataValues.updatedAt)
            // console.log(data.dataValues,"data.dataValuesdata.dataValues")
            return res.status(200).json(data)
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static delete(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                return res.status(404).json({"message" : "data not found"})
            } else{
                data.destroy()
                .then( destroyedData => {
                    return res.status(200).json(data)
                })
                .catch ( err => {
                    return res.status(500).json({ "message" : "internal server error"})
                })
            }
        })
        .catch ( err => {
            console.log(err,"err di controller")
            return res.status(500).json({"message" : "internal server error"})
        })
    }
}

module.exports = ProductsController