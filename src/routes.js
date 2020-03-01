const express = require('express');

const autoRequireAll = require('./util/autoRequireAll');

const controllers = autoRequireAll(__dirname, './controllers');

const router = express.Router();

router.get('/', controllers.indexController.index);

router.get('/users', controllers.userController.index);
router.get('/users/:id', controllers.userController.show);
router.post('/users', controllers.userController.store);
router.put('/users/:id', controllers.userController.update);
router.delete('/users/:id', controllers.userController.destroy);

router.get('/users/:user_id/addresses', controllers.addressController.index);
router.post('/users/:user_id/addresses', controllers.addressController.store);
router.put('/users/:user_id/addresses/:id', controllers.addressController.update);
router.delete('/users/:user_id/addresses/:id', controllers.addressController.destroy);

router.get('/users/:user_id/techs', controllers.techController.index);
router.post('/users/:user_id/techs', controllers.techController.store);
router.put('/users/:user_id/techs/:id', controllers.techController.update);
router.delete('/users/:user_id/techs/:id', controllers.techController.destroy);

router.get('/report', controllers.reportController.show);

module.exports = router;