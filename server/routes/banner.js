const router = require(`express`).Router()
const BannerController = require(`../controllers/BannerController`)

router.get(`/`, BannerController.read)
router.post(`/`, BannerController.new)
router.get(`/:id`, BannerController.find)
router.put(`/:id`, BannerController.edit)
router.delete(`/:id`, BannerController.delete)


module.exports = router