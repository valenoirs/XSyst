const mongoose = require('mongoose')

const Gejala = mongoose.model(
  'Gejala',
  new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    kode: { type: String, required: true, unique: true },
    keterangan: { type: String, required: true },
  })
)

module.exports = Gejala
