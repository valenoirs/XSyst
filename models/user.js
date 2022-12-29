const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: String },
  })
)

module.exports = User
