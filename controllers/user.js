const {v4: uuidv4} = require('uuid')

const comparePassword = require('../utils/comparePassword')
const hashPassword = require('../utils/hashPassword')

const User = require('../models/user');

exports.Login = async (req, res, next) => {
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
        req.session.idUser = user.idUser;
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