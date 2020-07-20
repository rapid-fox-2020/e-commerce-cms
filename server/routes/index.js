const UserController = require('../controllers/UserController');
const { authentication, authorization } = require('../middlewares/auth');
const router = require('express').Router();
const productRouter = require('./productRoutes');

router.post('/login', UserController.login);

router.use(authentication, authorization);
router.use('/products', productRouter);

module.exports = router;