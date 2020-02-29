const express = require('express');

const usersController = require('./controllers/usersController');

const router = express.Router();

router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.post('/users', usersController.store);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

module.exports = router;