const mongoose = require('mongoose');

const Solusi = mongoose.model('Solusi', new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    rules: {type:Array, required:true, default: []},
    keterangan: {type:String, required:true},
}))

module.exports = Solusi;