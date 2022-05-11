const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

const Riwayat = require('../models/riwayat')
const Gejala = require('../models/gejala')
const Penyakit = require('../models/penyakit')
const User = require('../models/user')

// POST
router.post('/login', userController.login)

router.post('/register', userController.register)

router.post('/diagnosa', userController.diagnosa)

router.post('/recovery', userController.recovery)

router.post('/verification', userController.verification)

router.post('/password', userController.password)

router.post('/edit', userController.edit)

// GET
router.get('/logout', userController.logout)

router.get('/login', (req, res) => {
    if(!req.session.idUser){
        res.render('user/login', {layout: 'layouts/user', title: 'Login', error: req.flash('error')})
    }
    else{
        res.redirect('/')
    }
})

router.get('/register', (req, res) => {
    if(!req.session.idUser){
        res.render('user/register', {layout: 'layouts/user', title: 'Register', error: req.flash('error')})
    }
    else{
        res.redirect('/')
    }
})

router.get('/edit', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login')
    }
    else{
        const user = await User.findOne({id: req.session.idUser})

        res.render('user/edit', {layout: 'layouts/user', title: 'Edit', user, error: req.flash('error')})
    }
})

router.get('/diagnosa', (req, res) => {
    res.render('user/diagnosa', {layout: 'layouts/user', title: 'Diagnosa', error: req.flash('error')})
})

router.get('/riwayat', async (req, res) => {
    if(!req.session.idUser){
        req.flash('error', 'Untuk melihat riwayat harap login terlebih dahulu')
        res.redirect('/login')
    }
    else{
        const riwayatUser = await Riwayat.find({idUser: req.session.idUser})
        res.render('user/riwayat', {layout: 'layouts/user', title: 'Riwayat', riwayat: riwayatUser, error: req.flash('error')})
    }
})

router.get('/informasi', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login')
    }
    else{
        res.render('user/informasi', {layout: 'layouts/user', title: 'Informasi', error: req.flash('error')})
    }
})

router.get('/recovery', (req, res) => {
    if(!req.session.idUser){
        res.render('user/recovery', {layout: 'layouts/user', title: 'Password Recovery', error: req.flash('error')})
    }
    else{
        res.redirect('/')
    }
})

router.get('/', (req, res) => {
    res.render('user/index', {layout: 'layouts/user', title: 'Home', error: req.flash('error')})
})

router.get('/:id', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login')
    }
    else{
        const detail = await Riwayat.findOne({id: req.params.id})
        res.render('user/detail', {layout: 'layouts/user', title: 'Eye X Sys', detail, error: req.flash('error')})
    }
})


// router.get('/verification', (req, res) => {
//     if(!req.session.idUser){
//         res.render('user/verification', {layout: 'layouts/user', title: 'Verification Code', error: req.flash('error')})
//     }
//     else{
//         res.redirect('/login')
//     }
// })

// router.get('/hasil', async (req, res) => {
//     if(!req.session.idUser){
//         res.redirect('/login')
//     }
//     else{
//         const semuaRiwayat = await Riwayat.find()
//         const riwayat = semuaRiwayat[semuaRiwayat.length - 1]
        
//         res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil', riwayat, error: req.flash('error')})
//     }
// })

module.exports = router