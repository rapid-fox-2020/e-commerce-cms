const { Banner } = require("../models")

class BannerController {
  static showAll(req,res,next){
    Banner.findAll({
      order: [['id','ASC']]
    })
    .then((data)=>{
      return res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static showById(req,res,next){
    Banner.findByPk(+req.params.id)
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

  static addBanner(req,res,next){
    let banner = {
      image_url: req.body.image_url,
      status:req.body.status,
    }
    Banner.create(banner)
    .then((data)=>{
      if(data.id){
        return res.status(201).json(data)
      }
    })
    .catch((err)=>{
      console.log(err)
      next(err)
    })
  }

  static updateBanner(req,res,next){
    let { image_url, status } = req.body
    Banner.update({
          image_url:image_url,
          status: status,
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

  static deleteBanner(req,res,next){
    let deletedData = []
    Banner.findByPk(+req.params.id)
    .then((data)=>{
      deletedData.push(data)
      return Banner.destroy({
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


module.exports = BannerController
