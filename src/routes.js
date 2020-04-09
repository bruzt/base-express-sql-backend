const express = require('express');

const autoRequireAll = require('./util/autoRequireAll');
const verifyJwt = require('./middlewares/verifyJwt');

const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './middlewares/validators');

const router = express.Router();

// VIEW ESTÁTICA
//router.get('/', controllers.indexController.index);

// ADICIONA, ALTERA OU REMOVE UM USUÁRIO
router.get('/users', controllers.userController.index);
router.get('/users/:id', validators.userValidators.show, controllers.userController.show);
router.post('/users', validators.userValidators.store, controllers.userController.store);
router.put('/users/:id', validators.userValidators.update, verifyJwt, controllers.userController.update);
router.delete('/users/:id', validators.userValidators.destroy, verifyJwt, controllers.userController.destroy);

// ADICIONA, ALTERA OU REMOVE UM ENDEREÇO DE UM USUÁRIO
router.get('/users/:user_id/addresses', validators.addressValidators.index, verifyJwt, controllers.addressController.index);
router.post('/users/:user_id/addresses', validators.addressValidators.store, verifyJwt, controllers.addressController.store);
router.put('/users/:user_id/addresses/:id', validators.addressValidators.update, verifyJwt, controllers.addressController.update);
router.delete('/users/:user_id/addresses/:id', validators.addressValidators.destroy, verifyJwt, controllers.addressController.destroy);

// UPDATE DE SENHA POR EMAIL
router.post('/reset-password', validators.userResetPasswordValidator.store, controllers.userResetPasswordController.store);
router.put('/reset-password', validators.userResetPasswordValidator.update, controllers.userResetPasswordController.update);

// ADICIONA, ALTERA OU REMOVE UMA TECNOLOGIA
router.get('/techs', controllers.techController.index);
router.get('/techs/:tech_id', validators.techValidators.show, controllers.techController.show);
router.post('/techs', validators.techValidators.store, verifyJwt, controllers.techController.store);
router.put('/techs/:id', validators.techValidators.update, verifyJwt, controllers.techController.update);
router.delete('/techs/:id', validators.techValidators.destroy, verifyJwt, controllers.techController.destroy);

// VINCULA OU DESVINCULA UMA TECNOLOGIA A UM USUÁRIO
router.get('/users/:user_id/techs', validators.userTechValidators.index, verifyJwt, controllers.userTechController.index);
router.post('/users/:user_id/techs/:tech_id', validators.userTechValidators.store, verifyJwt, controllers.userTechController.store);
router.delete('/users/:user_id/techs/:tech_id', validators.userTechValidators.destroy, verifyJwt, controllers.userTechController.destroy);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, controllers.sessionController.store);

// RETORNA USUÁRIOS COM SEUS ENDEREÇOS E TECNOLOGIAS
router.get('/report', validators.reportValidators.show, verifyJwt, controllers.reportController.show);

module.exports = router;