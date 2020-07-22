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
      Product.findAll({ order: [['id', 'ASC']] })
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
      const id = req.params.id
      const Error = { name: "DATA_NOT_FOUND" }

      Product.findByPk(id)
         .then(data => {

            if (data) {
               return Product.destroy({ where: { id } })
            } else {
               throw Error
               // next({ name: "DATA_NOT_FOUND" })
            }
         })
         .then((iniApa) => {
            res.status(200).json({ message: "successfully deleted" })
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = productsController