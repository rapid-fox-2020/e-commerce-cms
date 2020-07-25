const routes = require('express').Router();
const Controller = require('../controllers/ProductController');
const { authentication, authorizationAdmin } = require('../middleware/Auth')

routes.use(authentication)
routes.use(authorizationAdmin)

routes.get('/', Controller.findAll);
routes.get('/:id', Controller.getOneProduct);
routes.post('/', Controller.addProducts);

routes.put('/:id', Controller.update);
routes.delete('/:id', Controller.destroy);



module.exports = routes;