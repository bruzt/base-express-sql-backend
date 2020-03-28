const express = require('express');

const autoRequireAll = require('./util/autoRequireAll');
const verifyJwt = require('./middlewares/verifyJwt');

const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './validators');

const router = express.Router();

router.get('/', controllers.indexController.index);

router.get('/users', controllers.userController.index);
router.get('/users/:id', validators.userValidators.show, controllers.userController.show);
router.post('/users', validators.userValidators.store, controllers.userController.store);
router.put('/users/:id', validators.userValidators.update, controllers.userController.update);
router.delete('/users/:id', validators.userValidators.destroy, controllers.userController.destroy);

router.get('/users/:user_id/addresses', validators.addressValidators.index, controllers.addressController.index);
router.post('/users/:user_id/addresses', validators.addressValidators.store, controllers.addressController.store);
router.put('/users/:user_id/addresses/:id', validators.addressValidators.update, controllers.addressController.update);
router.delete('/users/:user_id/addresses/:id', validators.addressValidators.destroy, controllers.addressController.destroy);

router.get('/users/:user_id/techs', validators.techValidators.index, controllers.techController.index);
router.post('/users/:user_id/techs', validators.techValidators.store, controllers.techController.store);
router.put('/users/:user_id/techs/:id', validators.techValidators.update, controllers.techController.update);
router.delete('/users/:user_id/techs/:id', validators.techValidators.destroy, controllers.techController.destroy);

router.get('/report', validators.reportValidators.show, verifyJwt, controllers.reportController.show);

router.post('/sessions', validators.sessionValidators.store, controllers.sessionController.store);

module.exports = router;