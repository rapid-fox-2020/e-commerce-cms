const router = require(`express`).Router()
const ProductController = require(`../controllers/ProductController`)
const {authorization} = require(`../middlewares/auth`)

router.get(`/`, authorization, ProductController.read)
router.post(`/`, authorization, ProductController.new)
router.get(`/:id`, authorization, ProductController.find)
router.put(`/:id`, authorization, ProductController.edit)
router.delete(`/:id`, authorization, ProductController.delete)


module.exports = router