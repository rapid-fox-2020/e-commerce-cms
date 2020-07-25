const { Product } = require("../models");
class ProductController {
  static async add(req, res, next) {
    try {
      const newProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        category: req.body.category,
      };
      const result = await Product.create(newProduct);
      return res.status(201).json({ message: result });
    } catch (err) {
      next(err);
    }
  }
  static async read(req, res, next) {
    try {
      const result = await Product.findAll();

      return res.status(200).json({ message: result });
    } catch (err) {
      next(err);
    }
  }

  static async readById(req, res, next) {
    try {
      const param = Number(req.params.id);
      const result = await Product.findOne({ where: { id: param } });

      return res.status(200).json({ message: result });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const param = Number(req.params.id);
      const updateProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        category: req.body.category,
      };

      const result = await Product.update(updateProduct, {
        where: { id: param },
        returning: true,
      });
      console.log(result);
      if (result[0] === 0) {
        throw { name: "data not found" };
      } else {
        return res.status(200).json({ message: result });
      }
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const param = Number(req.params.id);
      const result = await Product.destroy({
        where: { id: param },
        returning: true,
      });

      if (!result) {
        throw { name: "data not found" };
      } else {
        return res.status(200).json({ message: "success delete" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
