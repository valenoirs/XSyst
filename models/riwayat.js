const mongoose = require('mongoose')

const Riwayat = mongoose.model(
  'Riwayat',
  new mongoose.Schema(
    {
      id: { type: String, required: true, unique: true },
      idUser: { type: String, required: true },
      penyakit: { type: String, required: true },
      jawaban: { type: Array, required: true, default: [] },
      persentase: { type: Array, required: true, default: [] },
      solusi: { type: String, required: true },
      gejala: { type: Array, required: true, default: [] },
      pencegahan: { type: Array, required: true, default: [] },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = Riwayat
