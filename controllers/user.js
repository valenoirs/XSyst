const {v4: uuidv4} = require('uuid')

const comparePassword = require('../utils/comparePassword')
const hashPassword = require('../utils/hashPassword')

const User = require('../models/user')
const Penyakit = require('../models/penyakit')
const Gejala = require('../models/gejala')
const Solusi = require('../models/solusi')
const Riwayat = require('../models/riwayat')

module.exports.login = async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({email: req.body.email});

        // User validation
        if(!user){
            console.log('User not found!');
            req.flash('error', 'Email tidak ditemukan!');
            // req.session.error = 'Email salah!';
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
        req.session.namaUser = user.nama;

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

        req.body.id = uuidv4();
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
            if(gejala.join('') === penyakit[key].gejala.join('')){
                console.log(`Sakit = ${penyakit[key].nama}`)
                for(let key in solusi){
                    if(gejala.join('') === solusi[key].gejala.join('')){
                        console.log(`Solusi = ${solusi[key].keterangan}`)

                        const newRiwayat = new Riwayat({
                            idRiwayat: uuidv4(),
                            idUser: uuidv4(),
                            penyakit: penyakit[key].nama,
                            solusi: solusi[key].keterangan,
                            gejala: gejala
                        })

                        await newRiwayat.save()

                        console.log('Riwayat baru')

                        return res.redirect('/hasil')
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
}