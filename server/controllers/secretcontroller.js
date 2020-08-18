const { authorize, listFiles } = require('../helpers/googledrive.js')

class SecretController {
  static addImage(req,res,next) {
    res.status(201).json({message: "Success Adding Secret Image"})
  }

  static showAll(req,res,next) {
    const auth = authorize()
    let newData = []
    listFiles(auth)
    .then((data)=>{
      for(let i = 0; i < data.length; i++) {
        newData.push(`${data[i].webContentLink.slice(0,-8)}view`)
      }
      res.status(200).json({data: newData})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = SecretController
