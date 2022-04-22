const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

// POST
router.post('/login', userController.Login);

router.post('/register', userController.Register);

// GET
router.get('/login', (req, res) => {
    res.render('user/login', {layout: 'layouts/user', title: 'Login'})
})

router.get('/register', (req, res) => {
    res.render('user/register', {layout: 'layouts/user', title: 'Register'})
})

router.get('/', (req, res) => {
    res.send('Halaman Utama User')
})

module.exports = router;