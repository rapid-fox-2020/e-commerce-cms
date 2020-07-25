const { Product } = require('../models')

class ProductController {

  static getAll(req, res, next) {
    Product.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static add(req, res, next) {
    let newProduct = {
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create(newProduct)
      .then((data) => {
        return res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    let productId = req.params.id
    let newUpdate = {
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock,
      updatedAt: new Date()
    }
    Product.update(newUpdate, { where: { id: productId }, returning: true })
      .then((data) => {
        if (data) {
          return res.status(200).json(data)
        } else {
          throw {
            statusCode: 404,
            name: "CustomValidation",
            message: "Data not found"
          }
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let productId = req.params.id
    let deletedData
    Product.findByPk(productId)
      .then((foundData) => {
        deletedData = foundData
        return Product.destroy({ where: { id: productId } })
      })
      .then((data) => {
        if (!data) {
          throw {
            statusCode: 404,
            name: "CustomValidation",
            message: "Data not found"
          }
        } else {
          return res.status(200).json(deletedData)
        }
      })
      .catch((err) => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = ProductController