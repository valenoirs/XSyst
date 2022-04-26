const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

const Riwayat = require('../models/riwayat')
const Gejala = require('../models/gejala')
const Penyakit = require('../models/penyakit')

// POST
router.post('/login', userController.login);

router.post('/register', userController.register);

router.post('/diagnosa', userController.diagnosa);

// GET
router.get('/login', (req, res) => {
    res.render('user/login', {layout: 'layouts/user', title: 'Login'})
})

router.get('/register', (req, res) => {
    res.render('user/register', {layout: 'layouts/user', title: 'Register'})
})

router.get('/diagnosa', (req, res) => {
    res.render('user/diagnosa', {layout: 'layouts/user', title: 'Diagnosa'})
})

router.get('/riwayat', (req, res) => {
    res.render('user/riwayat', {layout: 'layouts/user', title: 'Riwayat'})
})

router.get('/informasi', (req, res) => {
    res.render('user/informasi', {layout: 'layouts/user', title: 'Informasi'})
})

router.get('/hasil', async (req, res) => {
    const semuaRiwayat = await Riwayat.find()
    const riwayat = semuaRiwayat[semuaRiwayat.length - 1];
    const gejala = await Gejala.find({kode: {$in : riwayat.gejala}});
    const penyakit = await Penyakit.find({nama: riwayat.penyakit});
    
    res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil', riwayat, gejala, pencegahan : penyakit[0].pencegahan});
})

router.get('/', (req, res) => {
    res.render('user/index', {layout: 'layouts/user', title: 'Home'})
})

module.exports = router;