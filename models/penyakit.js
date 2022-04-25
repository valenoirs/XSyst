const mongoose = require('mongoose');

const Penyakit = mongoose.model('Penyakit', new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    nama: {type:String, required:true, unique:true},
    gejala: {type:Array, required:true, default: []},
    keterangan: {type:String, required:true},
    pencegahan: {type:Array, required:true, default: []},
}))

module.exports = Penyakit;