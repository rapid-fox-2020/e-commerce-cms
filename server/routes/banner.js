const router = require(`express`).Router()
const BannerController = require(`../controllers/BannerController`)
const {authorization} = require(`../middlewares/auth`)

router.get(`/`, authorization, BannerController.read)
router.post(`/`, authorization, BannerController.new)
router.get(`/:id`, authorization, BannerController.find)
router.put(`/:id`, authorization, BannerController.edit)
router.delete(`/:id`, authorization, BannerController.delete)


module.exports = router