const mongoose = require('mongoose')

const Code = mongoose.model(
  'Code',
  new mongoose.Schema(
    {
      id: { type: String, required: true, unique: true },
      email: { type: String, required: true },
      code: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = Code
