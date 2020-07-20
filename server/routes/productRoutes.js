const ProductController = require('../controllers/ProductController');
const router = require('express').Router();

router.get('/', ProductController.getAll);
router.post('/', ProductController.create);
router.get('/:id', ProductController.getOne);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router;