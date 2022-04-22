const mongoose = require('mongoose');

const Gejala = mongoose.model('Gejala', new mongoose.Schema({
    kode: {type:String, required:true, unique:true},
    keterangan: {type:String, required:true},
}))

module.exports = Gejala;