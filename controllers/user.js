const {v4: uuid} = require('uuid')

const comparePassword = require('../utils/comparePassword')
const hashPassword = require('../utils/hashPassword')
const sendEmail = require('../utils/sendEmail')

const User = require('../models/user')
const Penyakit = require('../models/penyakit')
const Gejala = require('../models/gejala')
const Solusi = require('../models/solusi')
const Riwayat = require('../models/riwayat')
const Code = require('../models/code')

module.exports.login = async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({email: req.body.email});

        // User validation
        if(!user){
            console.log('User not found!');
            req.flash('error', 'Email tidak ditemukan!');
            return res.redirect('/login');
        }

        // Password validation
        passwordValid = comparePassword(req.body.password, user.password);

        if(!passwordValid){
            console.log('Password invalid!');
            req.flash('error', 'Password salah!');
            return res.redirect('/login');
        }

        // Success
        req.session.idUser = user.id;

        console.log('Logged in!');
        return res.redirect('/');
    }
    catch (error) {
        console.error('login-error', error);
        req.flash('error', 'Login Error!');
        return res.redirect('/login');
    }
};

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user){
            console.log('User with same email found!');
            req.flash('error', 'Email telah terdaftar!');
            return res.redirect('/register');
        }

        // if(req.body.password.length < 8){
        //     console.log('Password length less than 8 characters!')
        //     req.flash('error', 'Password terlalu singkat!');
        //     return res.redirect('/register');
        // }

        if(req.body.password !== req.body.confirmPassword){
            console.log('Password validation error!')
            req.flash('error', 'Konfirmasi password salah!');
            return res.redirect('/register');
        }

        const hash = await hashPassword(req.body.password);

        delete req.body.confirmPassword;

        req.body.id = uuid();
        req.body.password = hash;

        const newUser = new User(req.body);
        await newUser.save();

        console.log(newUser);
        console.log('User added!');

        return res.redirect('/login');

    }
    catch (error) {
        console.error('register-error', error);
        req.session.error = "Register Error";
        return res.redirect('/register');
    }
}

exports.diagnosa = async (req, res) => {
    try{
        const gejala = Object.values(req.body)
        const penyakit = await Penyakit.find()
        const solusi = await Solusi.find()

        if(req.body.length === 0){
            console.error('diagnosa-error', error)
            req.flash('error', 'Pengguna harus memilih gejala!');
            return res.redirect('/register');            
        }

        for (let key in penyakit){
            if(gejala.join('') === penyakit[key].rules.join('')){
                console.log(`Sakit = ${penyakit[key].nama}`)
                for(let key in solusi){
                    if(gejala.join('') === solusi[key].rules.join('')){
                        console.log(`Solusi = ${solusi[key].keterangan}`)

                        const riwayat = {
                            idRiwayat: uuid(),
                            idUser: req.session.idUser,
                            penyakit: penyakit[key].nama,
                            solusi: solusi[key].keterangan,
                            gejala: penyakit[key].gejala,
                            pencegahan: penyakit[key].pencegahan
                        }

                        if(req.session.idUser){
                            const newRiwayat = new Riwayat(riwayat)
                            await newRiwayat.save()
                            console.log('Riwayat baru')
                        }

                        return res.render('user/hasil', {layout: 'layouts/user', riwayat})
                    }
                }
            }
        }

        console.log('Sakit = Tidak diketahui')        
        return res.redirect('back')
    }
    catch (error){
        console.error('diagnosa-error', error);
        req.session.error = "Diagnosa Error";
        return res.redirect('/diagnosa');
    }
} // Diagnosa

exports.recovery = async (req, res) => {
    try{
        const {email} = req.body
        const user = await User.find({email})

        if(!user){
            console.log('User not found!');
            req.flash('error', 'Email tidak ditemukan!');
            return res.redirect('back');
        }

        const code = uuid().toString().replace('-', '').substring(0, 8)

        sendEmail(email, code);

        await Code.create({
            id: uuid(),
            email,
            code
        })

        console.log('Email sent!')        
        return res.redirect('/verification')
    }
    catch (error){
        console.error('forget-password-error', error);
        req.session.error = "Forget Password Error";
        return res.redirect('back');
    }
} // Forget Password