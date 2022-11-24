const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.view);
router.get('/register', userController.form);
router.post('/register', userController.create);
router.get('/login', userController.loginform);
router.post('/login', userController.login);
router.get('/home', userController.homepage);

module.exports = router;