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

router.get('/diagnosa', (req, res) => {
    res.render('user/diagnosa', {layout: 'layouts/user', title: 'Register'})
})

router.get('/riwayat', (req, res) => {
    res.render('user/riwayat', {layout: 'layouts/user', title: 'Register'})
})

router.get('/informasi', (req, res) => {
    res.render('user/informasi', {layout: 'layouts/user', title: 'Register'})
})

router.get('/', (req, res) => {
    res.render('user/index', {layout: 'layouts/user', title: 'Home'})
})

module.exports = router;