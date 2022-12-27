const bcrypt = require('bcryptjs')

const comparePassword = (newPassword, oldPassword) => {
  return bcrypt.compareSync(newPassword, oldPassword)
}

module.exports = comparePassword
