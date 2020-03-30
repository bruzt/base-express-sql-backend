const express = require('express');

const autoRequireAll = require('./util/autoRequireAll');
const verifyJwt = require('./middlewares/verifyJwt');

const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './validators');

const router = express.Router();

// VIEW ESTÁTICA
router.get('/', controllers.indexController.index);

// ADICIONA, ALTERA OU REMOVE UM USUÁRIO
router.get('/users', controllers.userController.index);
router.get('/users/:id', validators.userValidators.show, controllers.userController.show);
router.post('/users', validators.userValidators.store, controllers.userController.store);
router.put('/users/:id', validators.userValidators.update, controllers.userController.update);
router.delete('/users/:id', validators.userValidators.destroy, controllers.userController.destroy);

// ADICIONA, ALTERA OU REMOVE UM ENDEREÇO DE UM USUÁRIO
router.get('/users/:user_id/addresses', validators.addressValidators.index, controllers.addressController.index);
router.post('/users/:user_id/addresses', validators.addressValidators.store, controllers.addressController.store);
router.put('/users/:user_id/addresses/:id', validators.addressValidators.update, controllers.addressController.update);
router.delete('/users/:user_id/addresses/:id', validators.addressValidators.destroy, controllers.addressController.destroy);

// ADICIONA, ALTERA OU REMOVE UMA TECNOLOGIA
router.get('/techs', controllers.techController.index);
router.get('/techs/:tech_id', validators.techValidators.show, controllers.techController.show);
router.post('/techs', validators.techValidators.store, controllers.techController.store);
router.put('/techs/:id', validators.techValidators.update, controllers.techController.update);
router.delete('/techs/:id', validators.techValidators.destroy, controllers.techController.destroy);

// VINCULA OU DESVINCULA UMA TECNOLOGIA A UM USUÁRIO
router.get('/users/:user_id/techs', validators.userTechValidators.index, controllers.userTechController.index);
router.post('/users/:user_id/techs/:tech_id', validators.userTechValidators.store, controllers.userTechController.store);
router.delete('/users/:user_id/techs/:tech_id', validators.userTechValidators.destroy, controllers.userTechController.destroy);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, controllers.sessionController.store);

// RETORNA USUÁRIOS COM SEUS ENDEREÇOS E TECNOLOGIAS
router.get('/report', validators.reportValidators.show, verifyJwt, controllers.reportController.show);

module.exports = router;