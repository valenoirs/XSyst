const {v4: uuid} = require('uuid')

const comparePassword = require('../utils/comparePassword')
const hashPassword = require('../utils/hashPassword')
const sendEmail = require('../utils/sendEmail')
const emailTest = require('../utils/email')

const User = require('../models/user')
const Penyakit = require('../models/penyakit')
const Gejala = require('../models/gejala')
const Solusi = require('../models/solusi')
const Riwayat = require('../models/riwayat')
const Code = require('../models/code')

module.exports.logout = async (req, res) => {
    try{
        delete req.session.idUser
        delete req.session.namaUser

        console.log('User logged out')
        return res.redirect('/')
    }
    catch (error){
        console.error('logout-error', error)
        return res.redirect('/')
    }
} // Logout

exports.login = async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({email: req.body.email})

        // User validation
        if(!user){
            console.log('User not found!')
            req.flash('error', 'Email tidak ditemukan!')
            return res.redirect('/login')
        }

        // Password validation
        passwordValid = comparePassword(req.body.password, user.password)

        if(!passwordValid){
            console.log('Password invalid!')
            req.flash('error', 'Password salah!')
            return res.redirect('/login')
        }

        // Success
        req.session.idUser = user.id
        req.session.namaUser = user.nama
        req.session.emailUser = user.email

        await Code.deleteMany({email: req.body.email})

        console.log('User logged in!')
        return res.redirect('/')
    }
    catch (error) {
        console.error('login-error', error)
        req.flash('error', 'Login Error!')
        return res.redirect('/login')
    }
} // Login

exports.register = async (req, res) => {
    try {
        const {nama, email, password, confirmPassword} = req.body
        const user = await User.findOne({email: req.body.email})
        
        if(user){
            console.log('User with same email found!')
            req.flash('error', 'Email telah terdaftar!')
            return res.redirect('/register')
        }

        const validation = emailTest(email)

        console.log(validation)

        if(req.body.password.length < 8){
            console.log('Password length less than 8 characters!')
            req.flash('error', 'Password terlalu singkat!')
            return res.redirect('/register')
        }

        if(req.body.password !== req.body.confirmPassword){
            console.log('Password validation error!')
            req.flash('error', 'Konfirmasi password salah!')
            return res.redirect('/register')
        }

        const hash = await hashPassword(req.body.password)

        delete req.body.confirmPassword

        req.body.id = uuid()
        req.body.password = hash

        const newUser = new User(req.body)
        await newUser.save()

        console.log(newUser)

        // Log in user!
        req.session.idUser = req.body.id
        req.session.namaUser = req.body.nama
        req.session.emailUser = req.body.email

        console.log('User registered and logged in!')

        return res.redirect('/')

    }
    catch (error) {
        console.error('register-error', error)
        req.session.error = "Register Error"
        return res.redirect('/register')
    }
} // Register

exports.diagnosa = async (req, res) => {
    try{
        const gejala = Object.values(req.body).filter(e => e !== '')
        const penyakit = await Penyakit.find()
        const solusi = await Solusi.find()

        if(req.body.length === 0){
            console.error('diagnosa-error', error)
            req.flash('error', 'Pengguna harus memilih gejala!')
            return res.redirect('/register')            
        }

        const riwayat = {
            id: uuid(),
            idUser: req.session.idUser,
            penyakit: "Tidak terdeteksi",
            solusi: "Tidak terdeteksi",
            gejala: [],
            pencegahan: []
        }

        for (let key in penyakit){
            if(gejala.join('') === penyakit[key].rules.join('')){
                console.log(`Sakit = ${penyakit[key].nama}`)
                for(let key in solusi){
                    if(gejala.join('') === solusi[key].rules.join('')){
                        console.log(`Solusi = ${solusi[key].keterangan}`)

                        riwayat['penyakit'] = penyakit[key].nama
                        riwayat['solusi'] = solusi[key].keterangan
                        riwayat['gejala'] = penyakit[key].gejala
                        riwayat['pencegahan'] = penyakit[key].pencegahan

                        if(req.session.idUser){
                            const newRiwayat = new Riwayat(riwayat)
                            await newRiwayat.save()
                            
                            console.log('Riwayat baru')
                        }
                        
                        console.log(riwayat)
                        return res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil Diagnosa', riwayat, error: req.flash('error')})
                    }
                }
            }
        }

        if(req.session.idUser){
            const newRiwayat = new Riwayat(riwayat)
            await newRiwayat.save()

            console.log('Riwayat baru')
        }

        console.log(riwayat)
        return res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil Diagnosa', riwayat, error: req.flash('error')})
    }
    catch (error){
        console.error('diagnosa-error', error)
        req.session.error = "Diagnosa Error"
        return res.redirect('/diagnosa')
    }
} // Diagnosa

exports.recovery = async (req, res) => {
    try{
        console.log(req.body)
        const {email} = req.body
        const user = await User.findOne({email})
        
        if(!user){
            console.log('User not found!')
            req.flash('error', 'Email tidak ditemukan!')
            return res.redirect('back')
        }

        const code = uuid().toString().replace('-', '').substring(0, 8)

        sendEmail(email, code)

        const newCode = new Code({
            id: uuid(),
            email,
            code
        })
        newCode.save()

        console.log('Email sent!')
        return res.render('user/verification', {layout: 'layouts/user', title: 'Verification', email, error: req.flash('error')})
        // return res.redirect('/verification')
    }
    catch (error){
        console.error('recovery-error', error)
        req.session.error = "Recovery Error"
        return res.redirect('back')
    }
} // Recovery

exports.verification = async (req, res) => {
    try{
        console.log(req.body)

        const {code, email} = req.body
        const verified = await Code.findOne({code, email})

        if(!verified){
            console.log('Verification code incorrect!')
            req.flash('error', 'Code verifikasi salah!')
            return res.render('user/verification', {layout: 'layouts/user', title: 'Verification', email, error: req.flash('error')})
        }
        
        console.log('Verified')
        return res.render('user/password', {layout: 'layouts/user', title: 'Reset Password', email, code, error: req.flash('error')})
    }
    catch(error){
        console.error('verification-error', error)
        req.session.error = "Verification Error"
        return res.redirect('back')
    }
} // Verification

exports.password = async (req, res) => {
    try{
        console.log(req.body)
        const {email, code, password, confirmPassword} = req.body
        
        if(password !== confirmPassword){
            console.log('Password validation error!')
            req.flash('error', 'Konfirmasi password salah!')
            return res.render('user/password', {layout: 'layouts/user', title: 'Reset Password', email, code, error: req.flash('error')})
        }

        const hash = await hashPassword(password)

        await User.updateOne({email}, {
            $set: {
                password: hash
            }
        })

        await Code.deleteOne({email, code})

        console.log('Password Recovered')
        return res.redirect('/login')
    }
    catch (error){
        console.error('verification-error', error)
        req.session.error = "Verification Error"
        return res.redirect('back')
    }
} // Password

exports.edit = async (req, res) => {
    try{
        const user = await User.findOne({id: req.session.idUser})
        const duplicateUser = await User.findOne({email: req.body.email})

        if(duplicateUser && req.body.email !== user.email){
            console.log('User with same email found!')
            req.flash('error', 'Email telah terdaftar!')
            return res.redirect('/edit')
        }

        const passwordValid = comparePassword(req.body.password, user.password)

        if(!passwordValid){
            console.log('Password invalid!')
            req.flash('error', 'Password salah!')
            return res.redirect('/edit')
        }

        await User.updateOne({id: req.session.idUser}, {
            $set: {
                email: req.body.email,
                nama: req.body.nama,
            }
        })

        req.session.namaUser = req.body.nama
        req.session.emailUser = req.body.email
        
        res.locals.namaUser = req.session.namaUser
        res.locals.emailUser = req.session.emailUser

        console.log('User Edited')
        return res.redirect('/')
    }
    catch (error){
        console.error('edit-error', error)
        req.session.error = "Edit Error"
        return res.redirect('back')
    }
} // Edit