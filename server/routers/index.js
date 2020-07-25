const router = require("express").Router();
const UserController = require("../controllers/UserController");
const productsRouter = require("./productsRouter");

router.post("/login", UserController.login);
router.use("/products", productsRouter);

module.exports = router;
