const express = require('express');

const autoRequire = require('./util/autoRequire');

const routes = autoRequire(__dirname, './controllers');

const router = express.Router();

router.get('/', routes.indexController.index);

router.get('/users', routes.userController.index);
router.get('/users/:id', routes.userController.show);
router.post('/users', routes.userController.store);
router.put('/users/:id', routes.userController.update);
router.delete('/users/:id', routes.userController.destroy);

router.get('/users/:user_id/addresses', routes.addressController.index);
router.post('/users/:user_id/addresses', routes.addressController.store);
router.put('/users/:user_id/addresses/:id', routes.addressController.update);
router.delete('/users/:user_id/addresses/:id', routes.addressController.destroy);

router.get('/users/:user_id/techs', routes.techController.index);
router.post('/users/:user_id/techs', routes.techController.store);
router.put('/users/:user_id/techs/:id', routes.techController.update);
router.delete('/users/:user_id/techs/:id', routes.techController.destroy);

router.get('/report', routes.reportController.show);

module.exports = router;