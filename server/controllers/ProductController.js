const { Product } = require('../models');

class ProductController {
  static async getAll(_, res, next) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {id: +req.params.id}
      });
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      let newProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: +req.body.price,
        stock: +req.body.stock,
      }
      newProduct = await Product.create(newProduct);
      return res.status(201).json(newProduct);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      let newData = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: +req.body.price,
        stock: +req.body.stock,
        updatedAt: new Date()
      }
      await Product.update(newData, {
        where: { id: req.params.id }
      })
      return res.status(200).json(newData);
    } catch (e) {
      next(e);
    }
  }

  static async destroy(req, res, next) {
    try {
      const product = await Product.findOne({where: {id: req.params.id}});
      await Product.destroy({where: {id: +req.params.id}});
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProductController;