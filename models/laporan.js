const mongoose = require('mongoose');

const Laporan = mongoose.model('Laporan', new mongoose.Schema({
    emailUser: {type:String, required:true},
    konten: {type:String, required:true},
    isPassword: {type:Boolean, reuqired:true},
    isFixed: {type:Boolean, required:true}
}))

module.exports = Laporan;