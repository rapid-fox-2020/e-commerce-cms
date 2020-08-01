const bannerRoutes = require("express").Router()
const BannerController = require("../controllers/bannercontroller.js")
const { userAuthentication, userAuthorization } = require("../middlewares/auth.js")

bannerRoutes.get("/banners",userAuthentication,userAuthorization,BannerController.showAll)

bannerRoutes.post("/banners",userAuthentication,userAuthorization, BannerController.addBanner)

bannerRoutes.get("/banners/:id",userAuthentication,userAuthorization,BannerController.showById)

bannerRoutes.put("/banners/:id",userAuthentication,userAuthorization,BannerController.updateBanner)

bannerRoutes.delete("/banners/:id",userAuthentication,userAuthorization,BannerController.deleteBanner)

module.exports = bannerRoutes
