const { Product } = require("../models")

class ProductController {
  static showAll(req,res,next){
    Product.findAll()
    .then((data)=>{
      return res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static showById(req,res,next){
    Product.findByPk(+req.params.id)
    .then((data)=>{
      if(!data){
        const errorMessage = {
          name: "NotFoundError",
          message: "Data not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(data)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }
  static addProduct(req,res,next){
    let product = {
      name:req.body.name,
      image_url: req.body.image_url,
      price:req.body.price,
      stock:req.body.stock
    }
    console.log(product)
    Product.create(product)
    .then((data)=>{
      console.log(data)
      if(data.id){
        return res.status(201).json(data)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static updateProduct(req,res,next){
    let { name, image_url, price, stock } = req.body
    Product.update({
          name:name,
          image_url:image_url,
          price: +price,
          stock: +stock
        },{
          where:{
          id: +req.params.id
        },returning:true})
    .then(data=>{
      if(data[0] === 0){
        const errorMessage = {
          name: "NotFoundError",
          message: "Product not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(data[1][0])
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static deleteProduct(req,res,next){
    let deletedData = []
    Product.findByPk(+req.params.id)
    .then((data)=>{
      deletedData.push(data)
      return Product.destroy({
        where:{
          id: +req.params.id
        }
      })
    })
    .then(()=>{
      if(deletedData[0] === null){
        const errorMessage = {
          name: "NotFoundError",
          message: "Product not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(deletedData[0])
      }
    })
    .catch((err)=>{
      next(err)
    })
  }
}

module.exports = ProductController
