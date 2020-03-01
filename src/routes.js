const express = require('express');

const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');
const addressController = require('./controllers/addressController');
const techController = require('./controllers/techController');
const reportController = require('./controllers/reportController');

const router = express.Router();

router.get('/', indexController.index);

router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

router.get('/users/:user_id/addresses', addressController.index);
router.post('/users/:user_id/addresses', addressController.store);
router.put('/users/:user_id/addresses/:id', addressController.update);
router.delete('/users/:user_id/addresses/:id', addressController.destroy);

router.get('/users/:user_id/techs', techController.index);
router.post('/users/:user_id/techs', techController.store);
router.put('/users/:user_id/techs/:id', techController.update);
router.delete('/users/:user_id/techs/:id', techController.destroy);

router.get('/report', reportController.show);

module.exports = router;