const mongoose = require('mongoose');

const Penyakit = mongoose.model('Penyakit', new mongoose.Schema({
    kode: {type:String, required:true, unique:true},
    keterangan: {type:String, required:true},
}))

module.exports = Penyakit;