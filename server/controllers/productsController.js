const { Product } = require('../models')


class productsController {

   static createProduct(req, res, next) {
      const { name, imageUrl, price, stock } = req.body

      Product.create({
         name,
         imageUrl,
         price,
         stock
      })
         .then(newProduct => {
            res.status(201).json(newProduct)
            next()
         })
         .catch(err => {
            next(err)
         })
   }

   static getAllProduct(req, res, next) {
      Product.findAll()
         .then(allProducts => {
            res.status(200).json(allProducts)
         })
         .catch(err => {
            next(err)
         })
   }

   static getOneProduct(req, res, next) {

      Product.findOne({ where: { id: req.params.id } })
         .then(oneProduct => {
            if (oneProduct) {
               res.status(200).json(oneProduct)
            } else {
               next({ name: "DATA_NOT_FOUND" })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static updateProduct(req, res, next) {
      const editProduct = {
         name: req.body.name,
         imageUrl: req.body.imageUrl,
         price: req.body.price,
         stock: req.body.stock
      }

      Product.update(editProduct, { where: { id: req.params.id } })
         .then(updatedProduct => {
            console.log(updatedProduct[0], "<<<<<<<<<< updated products");
            if (updatedProduct[0] == 1) {
               res.status(200).json({ message: "successfully updated" })
               next()
            } else {
               next({ name: "DATA_NOT_FOUND" })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static deleteProduct(req, res, next) {
      let productData;
      const id = req.params.id

      Product.findOne({ where: { id } })
         .then(data => {
            if (!data) {
               next({ name: "DATA_NOT_FOUND" })
            } else {
               productData = data
               return Product.destroy({ where: { id } })
            }
         })
         .then(() => {
            res.status(200).json({ message: "succesfully deleted" })
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = productsController