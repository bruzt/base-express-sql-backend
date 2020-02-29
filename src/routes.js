const express = require('express');

const usersController = require('./controllers/usersController');
const addressController = require('./controllers/addressController');

const router = express.Router();

router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.post('/users', usersController.store);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

router.get('/users/:user_id/addresses', addressController.show);
router.post('/users/:user_id/addresses', addressController.store);
/*router.put('/addresses/:id', addressController.update);
router.delete('/addresses/:id', addressController.destroy);*/

module.exports = router;