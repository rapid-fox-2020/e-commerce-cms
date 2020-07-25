const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const {
  authentication,
  authorization,
} = require("../middlewares/authentication");

router.post("/", authentication, authorization, ProductController.add);
router.get("/", authentication, authorization, ProductController.read);
router.get("/:id", authentication, authorization, ProductController.readById);
router.put("/:id", authentication, authorization, ProductController.update);
router.delete("/:id", authentication, authorization, ProductController.delete);

module.exports = router;
