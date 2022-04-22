const mongoose = require('mongoose');

const Penyakit = mongoose.model('Penyakit', new mongoose.Schema({
    nama: {type:String, required:true, unique:true},
    gejala: {type:Array, required:true, default: []},
    keterangan: {type:String, required:true},
}))

module.exports = Penyakit;