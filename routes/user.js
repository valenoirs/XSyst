const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login', {layout: 'layouts/user', title: 'Login'})
})

router.get('/', (req, res) => {
    res.send('Halaman Utama User')
})

module.exports = router;