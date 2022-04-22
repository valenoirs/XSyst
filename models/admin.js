const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
}))

module.exports = Admin;