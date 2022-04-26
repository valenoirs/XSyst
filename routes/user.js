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
    if(!req.session.idUser){
        res.render('user/login', {layout: 'layouts/user', title: 'Login'})
    }
    else{
        res.redirect('/');
    }
})

router.get('/register', (req, res) => {
    if(!req.session.idUser){
        res.render('user/register', {layout: 'layouts/user', title: 'Register'})
    }
    else{
        res.redirect('/');
    }
})

router.get('/diagnosa', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/diagnosa', {layout: 'layouts/user', title: 'Diagnosa'})
    }
})

router.get('/riwayat', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        const riwayatUser = await Riwayat.find({idUser: req.session.idUser})
        console.log(riwayatUser);
        res.render('user/riwayat', {layout: 'layouts/user', title: 'Riwayat', riwayat: riwayatUser})
    }
})

router.get('/informasi', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/informasi', {layout: 'layouts/user', title: 'Informasi'})
    }
})

router.get('/hasil', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        const semuaRiwayat = await Riwayat.find()
        const riwayat = semuaRiwayat[semuaRiwayat.length - 1];
        
        res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil', riwayat});
    }
})

router.get('/', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/index', {layout: 'layouts/user', title: 'Home'})
    }
})

module.exports = router;