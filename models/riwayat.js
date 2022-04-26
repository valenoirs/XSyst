const mongoose = require('mongoose');

const Riwayat = mongoose.model('Riwayat', new mongoose.Schema({
    idRiwayat: {type:String, required:true, unique:true},
    idUser: {type:String, required:true},
    penyakit: {type:String, required:true},
}))

module.exports = Riwayat;