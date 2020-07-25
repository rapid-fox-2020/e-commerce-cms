const routes = require('express').Router();
const Controller = require('../controllers/ProductController');
const { authentication, authorizationAdmin } = require('../middleware/Auth')

routes.use(authentication)

routes.get('/', Controller.findAll);
routes.get('/:id', Controller.getOneProduct);
routes.post('/', Controller.addProducts);

routes.put('/:id', authorizationAdmin, Controller.update);
routes.delete('/:id', authorizationAdmin, Controller.destroy);



module.exports = routes;