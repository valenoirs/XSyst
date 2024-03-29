const { v4: uuid } = require('uuid')

const comparePassword = require('../utils/comparePassword')
const hashPassword = require('../utils/hashPassword')
const sendEmail = require('../utils/sendEmail')
const emailTest = require('../utils/email')

const User = require('../models/user')
const Penyakit = require('../models/penyakit')
const Gejala = require('../models/gejala')
const Solusi = require('../models/solusi')
const Riwayat = require('../models/riwayat')
const Code = require('../models/code')

module.exports.logout = async (req, res) => {
  try {
    delete req.session.idUser
    delete req.session.namaUser
    delete req.session.isAdmin

    console.log('User logged out')
    return res.redirect('/')
  } catch (error) {
    console.error('logout-error', error)
    return res.redirect('/')
  }
} // Logout

exports.login = async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email })

    // User validation
    if (!user) {
      console.log('User not found!')
      req.flash('error', 'Email tidak ditemukan!')
      return res.redirect('/login')
    }

    // Password validation
    passwordValid = comparePassword(req.body.password, user.password)

    if (!passwordValid) {
      console.log('Password invalid!')
      req.flash('error', 'Password salah!')
      return res.redirect('/login')
    }

    // Success
    req.session.idUser = user.id
    req.session.namaUser = user.nama
    req.session.emailUser = user.email

    if (user.isAdmin) {
      req.session.isAdmin = user.isAdmin
    }

    await Code.deleteMany({ email: req.body.email })

    console.log(`${user.nama}: Logged in!`)
    return res.redirect('/')
  } catch (error) {
    console.error('login-error', error)
    req.flash('error', 'Login Error!')
    return res.redirect('/login')
  }
} // Login

exports.register = async (req, res) => {
  try {
    const { nama, email, password, confirmPassword } = req.body
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      console.log('User with same email found!')
      req.flash('error', 'Email telah terdaftar!')
      return res.redirect('/register')
    }

    const validation = emailTest(email)

    console.log(validation)

    if (req.body.password.length < 8) {
      console.log('Password length less than 8 characters!')
      req.flash('error', 'Password terlalu singkat!')
      return res.redirect('/register')
    }

    if (req.body.password !== req.body.confirmPassword) {
      console.log('Password validation error!')
      req.flash('error', 'Konfirmasi password salah!')
      return res.redirect('/register')
    }

    const hash = await hashPassword(req.body.password)

    delete req.body.confirmPassword

    req.body.id = uuid()
    req.body.password = hash

    const newUser = new User(req.body)
    await newUser.save()

    console.log(newUser)

    // Log in user!
    req.session.idUser = req.body.id
    req.session.namaUser = req.body.nama
    req.session.emailUser = req.body.email

    console.log('User registered and logged in!')

    return res.redirect('/')
  } catch (error) {
    console.error('register-error', error)
    req.session.error = 'Register Error'
    return res.redirect('/register')
  }
} // Register

exports.diagnosa = async (req, res) => {
  try {
    const { ya } = req.body

    if (ya) {
      req.session.gejalaUser.push(req.session.gejala)
      req.session.jawabanUser.push(req.session.pertanyaan + ' Ya')
    } else {
      req.session.jawabanUser.push(req.session.pertanyaan + ' Tidak')
    }

    const gejala = req.session.gejalaUser
    const penyakit = await Penyakit.find()
    const solusi = await Solusi.find()

    if (req.body.length === 0) {
      console.error('diagnosa-error', error)
      req.flash('error', 'Pengguna harus memilih gejala!')
      return res.redirect('/diagnosa')
    }

    const riwayat = {
      id: uuid(),
      idUser: req.session.idUser,
      penyakit: 'Tidak ada penyakit dengan kemungiknan diatas 65%',
      solusi: 'Tidak terdeteksi, tetap jaga kesehatan mata anda ya.',
      jawaban: req.session.jawabanUser,
      gejala: ['-'],
      pencegahan: ['-'],
      persentase: [],
      username: req.session.namaUser,
    }

    for (let key in penyakit) {
      // LUCKY CUSTOM ALGORITHM
      let counter = 0
      let highestPenyakitScore = [{ persentase: 0 }]

      // Fungsi menghitung poin penyakit
      penyakit[key].rules.forEach((elementPenyakit) => {
        gejala.forEach((elementGejala) => {
          if (elementPenyakit === elementGejala) {
            counter += 1
          }
        })
      })

      // Persentase
      const persentase = (counter / penyakit[key].rules.length) * 100

      riwayat['persentase'].push({
        nama: penyakit[key].nama,
        persentase,
      })

      if (riwayat['persentase'].length === 8) {
        highestPenyakitScore = riwayat['persentase']
          .sort((a, b) => {
            return a.persentase - b.persentase
          })
          .reverse()
      }

      if (
        highestPenyakitScore[0].persentase > 64 &&
        highestPenyakitScore.length === 8
      ) {
        for (let keySolusi in solusi) {
          if (highestPenyakitScore[0].nama === solusi[keySolusi].penyakit) {
            const realPenyakit = await Penyakit.findOne(
              { nama: highestPenyakitScore[0].nama },
              { gejala: 1, pencegahan: 1 }
            )

            riwayat['penyakit'] = highestPenyakitScore[0].nama
            riwayat['solusi'] = solusi[keySolusi].keterangan
            riwayat['gejala'] = realPenyakit.gejala
            riwayat['pencegahan'] = realPenyakit.pencegahan

            if (req.session.idUser) {
              const newRiwayat = new Riwayat(riwayat)
              await newRiwayat.save()

              console.log(`${req.session.namaUser}: Riwayat baru`)
            }

            delete req.session.gejalaUser
            delete req.session.pertanyaan
            delete req.session.jawabanUser
            delete req.session.gejala

            return res.render('user/hasil', {
              layout: 'layouts/user',
              title: 'Hasil Diagnosa',
              riwayat,
              error: req.flash('error'),
            })
          }
        }
      }
    }

    if (req.session.idUser) {
      const newRiwayat = new Riwayat(riwayat)
      await newRiwayat.save()

      console.log(`${req.session.namaUser}: Riwayat baru`)
    }

    delete req.session.gejalaUser
    delete req.session.pertanyaan
    delete req.session.jawabanUser
    delete req.session.gejala

    return res.render('user/hasil', {
      layout: 'layouts/user',
      title: 'Hasil Diagnosa',
      riwayat,
      error: req.flash('error'),
    })
  } catch (error) {
    console.error('diagnosa-error', error)
    req.session.error = 'Diagnosa Error'
    return res.redirect('/diagnosa')
  }
} // Diagnosa

exports.recovery = async (req, res) => {
  try {
    console.log(req.body)
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      console.log('User not found!')
      req.flash('error', 'Email tidak ditemukan!')
      return res.redirect('back')
    }

    const code = uuid().toString().replace('-', '').substring(0, 8)

    sendEmail(email, code)

    const newCode = new Code({
      id: uuid(),
      email,
      code,
    })
    newCode.save()

    console.log('Email sent!')
    return res.render('user/verification', {
      layout: 'layouts/user',
      title: 'Verification',
      email,
      error: req.flash('error'),
    })
    // return res.redirect('/verification')
  } catch (error) {
    console.error('recovery-error', error)
    req.session.error = 'Recovery Error'
    return res.redirect('back')
  }
} // Recovery

exports.verification = async (req, res) => {
  try {
    console.log(req.body)

    const { code, email } = req.body
    const verified = await Code.findOne({ code, email })

    if (!verified) {
      console.log('Verification code incorrect!')
      req.flash('error', 'Code verifikasi salah!')
      return res.render('user/verification', {
        layout: 'layouts/user',
        title: 'Verification',
        email,
        error: req.flash('error'),
      })
    }

    console.log('Verified')
    return res.render('user/password', {
      layout: 'layouts/user',
      title: 'Reset Password',
      email,
      code,
      error: req.flash('error'),
    })
  } catch (error) {
    console.error('verification-error', error)
    req.session.error = 'Verification Error'
    return res.redirect('back')
  }
} // Verification

exports.password = async (req, res) => {
  try {
    console.log(req.body)
    const { email, code, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      console.log('Password validation error!')
      req.flash('error', 'Konfirmasi password salah!')
      return res.render('user/password', {
        layout: 'layouts/user',
        title: 'Reset Password',
        email,
        code,
        error: req.flash('error'),
      })
    }

    const hash = await hashPassword(password)

    await User.updateOne(
      { email },
      {
        $set: {
          password: hash,
        },
      }
    )

    await Code.deleteOne({ email, code })

    console.log('Password Recovered')
    return res.redirect('/login')
  } catch (error) {
    console.error('verification-error', error)
    req.session.error = 'Verification Error'
    return res.redirect('back')
  }
} // Password

exports.edit = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.session.idUser })
    const duplicateUser = await User.findOne({ email: req.body.email })

    if (duplicateUser && req.body.email !== user.email) {
      console.log('User with same email found!')
      req.flash('error', 'Email telah terdaftar!')
      return res.redirect('/edit')
    }

    const passwordValid = comparePassword(req.body.password, user.password)

    if (!passwordValid) {
      console.log('Password invalid!')
      req.flash('error', 'Password salah!')
      return res.redirect('/edit')
    }

    await User.updateOne(
      { id: req.session.idUser },
      {
        $set: {
          email: req.body.email,
          nama: req.body.nama,
        },
      }
    )

    req.session.namaUser = req.body.nama
    req.session.emailUser = req.body.email

    res.locals.namaUser = req.session.namaUser
    res.locals.emailUser = req.session.emailUser

    console.log('User Edited')
    return res.redirect('/')
  } catch (error) {
    console.error('edit-error', error)
    req.session.error = 'Edit Error'
    return res.redirect('back')
  }
} // Edit

exports.pertanyaan = async (req, res) => {
  try {
    const daftarPertanyaan = [
      ['G01', 'Apakah penglihatan anda terasa buram?'],
      ['G02', 'Apakah mata anda mudah tegang dan lelah?'],
      ['G03', 'Apakah kepala anda sakit?'],
      ['G04', 'Apakah anda merakasakan nyeri atau sakit di bagian mata?'],
      [
        'G05',
        'Apakah benda dengan jarak yang jauh terlihat kabur, namun nampak jelas jika dilihat dari dekat?',
      ],
      [
        'G06',
        'Apakah benda dengan jarak yang dekat terlihat kabur, namun tampak jelas jika dilihat dari jauh?',
      ],
      ['G07', 'Apakah anda kesulitan saat membaca?'],
      [
        'G08',
        'Apakah anda kesulitan membaca tulisan dengan huruf yang dicetak halus atau kecil?',
      ],
      ['G09', 'Apakah usia anda diatas 40 tahun?'],
      ['G10', 'Apakah anda kesulitan melihat pada malam hari?'],
      [
        'G11',
        'Apakah penglihatan anda buram saat melihat benda baik dengan jarak yang dekat maupun jauh?',
      ],
      [
        'G12',
        'Apakah penglihatan anda kurang jelas seperti terdapat kabut yang menhalangi?',
      ],
      ['G13', 'Apakah anda sering mengganti ukuran kacamata?'],
      [
        'G14',
        'Apakah anda melihat seperti ada pelangi yang melingkar disaat anda melihat lampu atau sumber cahaya?',
      ],
      [
        'G15',
        'Apakah radius penglihatan anda menyempit sehingga tidak dapat melihat objek sama sekali?',
      ],
      ['G16', 'Apakah anda sering merasa mual atau ingin muntah?'],
      [
        'G17',
        'Apakah anda kehilangan fungsi penglihatan pada salah satu mata anda?',
      ],
      [
        'G18',
        'Apakah mata anda seperti melihat kilatan cahaya atau bentuk-bentuk tidak wajar yang melayang?',
      ],
      ['G19', 'Apakah mata anda terasa gatal dan berair?'],
      ['G20', 'Apakah mata anda peka terhadap cahaya nampak?'],
    ]

    if (!req.session.gejalaUser) {
      req.session.gejalaUser = []
      req.session.jawabanUser = []
    }

    let { ya, gejala } = req.body

    if (ya) {
      req.session.gejalaUser.push(gejala)
      req.session.jawabanUser.push(req.session.pertanyaan + ' Ya')
    } else {
      req.session.jawabanUser.push(req.session.pertanyaan + ' Tidak')
    }

    if (!gejala) {
      console.log('Code gejala tidak ditemukan!')
      req.flash('error', 'Kode gejala tidak ditemukan!')
      return res.redirect('/diagnosa')
    }

    daftarPertanyaan.forEach((element, index) => {
      if (element.some((item) => item === gejala)) {
        req.session.pertanyaan = daftarPertanyaan[index + 1][1]
        req.session.gejala = daftarPertanyaan[index + 1][0]
      }
    })

    return res.redirect('/pertanyaan')
  } catch (error) {
    console.error('edit-error', error)
    req.session.error = 'Next Error'
    return res.redirect('/')
  }
}
