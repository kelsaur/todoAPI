const express = require('express');
const router = express.Router();
const { signUp, logIn } = require('../controllers/userController');

//Routes
router.post('/signup', signUp);
router.post('/login', logIn);

module.exports = router;
