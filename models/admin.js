const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
}))

module.exports = Admin;