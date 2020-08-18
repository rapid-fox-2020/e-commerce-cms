const productRoutes = require("express").Router()
const ProductController = require("../controllers/productcontroller.js")
const { userAuthentication, userAuthorization } = require("../middlewares/auth.js")

productRoutes.get("/products",userAuthentication, userAuthorization,ProductController.showAll)

productRoutes.get("/products/:id",userAuthentication,userAuthorization,ProductController.showById)

productRoutes.get("/products/:category",userAuthentication,userAuthorization,ProductController.showByCategory)

productRoutes.post("/products",userAuthentication,userAuthorization,ProductController.addProduct)

productRoutes.put("/products/:id",userAuthentication,userAuthorization,ProductController.updateProduct)

productRoutes.delete("/products/:id",userAuthentication,userAuthorization,ProductController.deleteProduct)

module.exports = productRoutes
