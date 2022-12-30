const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

const Riwayat = require('../models/riwayat')
const Gejala = require('../models/gejala')
const Penyakit = require('../models/penyakit')
const User = require('../models/user')

// POST
router.post('/login', userController.login)

router.post('/register', userController.register)

router.post('/diagnosa', userController.diagnosa)

router.post('/pertanyaan', userController.pertanyaan)

router.post('/recovery', userController.recovery)

router.post('/verification', userController.verification)

router.post('/password', userController.password)

router.post('/edit', userController.edit)

// GET
router.get('/logout', userController.logout)

router.get('/login', (req, res) => {
  if (!req.session.idUser) {
    res.render('user/login', {
      layout: 'layouts/user',
      title: 'Login',
      error: req.flash('error'),
    })
  } else {
    res.redirect('/')
  }
})

router.get('/register', (req, res) => {
  if (!req.session.idUser) {
    res.render('user/register', {
      layout: 'layouts/user',
      title: 'Register',
      error: req.flash('error'),
    })
  } else {
    res.redirect('/')
  }
})

router.get('/pengaturan', (req, res) => {
  if (!req.session.idUser) return res.redirect('/login')
  if (!req.session.isAdmin) return res.redirect('/404')

  return res.render('user/pengaturan/index', {
    layout: 'layouts/user',
    title: 'Pengaturan',
    error: req.flash('error'),
  })
})

router.get('/pengaturan/penyakit', async (req, res) => {
  if (!req.session.idUser) return res.redirect('/login')
  if (!req.session.isAdmin) return res.redirect('/404')

  const penyakit = await Penyakit.find()

  return res.render('user/pengaturan/penyakit', {
    layout: 'layouts/user',
    title: 'Pengaturan',
    penyakit,
    error: req.flash('error'),
  })
})

router.get('/pengaturan/gejala', async (req, res) => {
  if (!req.session.idUser) return res.redirect('/login')
  if (!req.session.isAdmin) return res.redirect('/404')

  const gejala = await Gejala.find()

  return res.render('user/pengaturan/gejala', {
    layout: 'layouts/user',
    title: 'Pengaturan',
    gejala,
    error: req.flash('error'),
  })
})

router.get('/penyakit/:id', async (req, res) => {
  if (!req.session.idUser) return res.redirect('/login')
  if (!req.session.isAdmin) return res.redirect('/404')

  const { id } = req.params

  const penyakit = await Penyakit.findOne({ id })

  return res.render('user/pengaturan/detail_penyakit', {
    layout: 'layouts/user',
    title: 'Pengaturan',
    penyakit,
    error: req.flash('error'),
  })
})

router.get('/edit', async (req, res) => {
  if (!req.session.idUser) {
    res.redirect('/login')
  } else {
    const user = await User.findOne({ id: req.session.idUser })

    res.render('user/edit', {
      layout: 'layouts/user',
      title: 'Edit',
      user,
      error: req.flash('error'),
    })
  }
})

router.get('/diagnosa', (req, res) => {
  delete req.session.gejalaUser
  delete req.session.pertanyaan
  delete req.session.gejala

  req.session.gejala = 'G01'
  req.session.pertanyaan = 'Apakah penglihatan anda terasa buram?'

  res.render('user/diagnosa', {
    layout: 'layouts/user',
    title: 'Diagnosa',
    error: req.flash('error'),
  })
})

router.get('/pertanyaan', (req, res) => {
  res.render('user/pertanyaan', {
    layout: 'layouts/user',
    title: 'Pertanyaan',
    pertanyaan: req.session.pertanyaan,
    gejala: req.session.gejala,
    error: req.flash('error'),
  })
})

router.get('/riwayat/:page', async (req, res) => {
  if (!req.session.idUser) {
    req.flash('error', 'Untuk melihat riwayat harap login terlebih dahulu')
    return res.redirect('/login')
  } else {
    const perPage = 10
    const currentPage = req.params.page || 1
    const skip = perPage * currentPage - perPage

    const render = async (query) => {
      const documentCount = await Riwayat.find(query).count()

      Riwayat.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .exec((err, riwayat) => {
          console.log(documentCount)
          return res.render('user/riwayat', {
            layout: 'layouts/user',
            title: 'Riwayat',
            riwayat,
            currentPage,
            skip,
            pages: Math.ceil(documentCount / perPage),
            error: req.flash('error'),
          })
        })
    }

    if (req.session.isAdmin) {
      return render({})
    } else {
      return render({ idUser: req.session.idUser })
    }
  }
})

router.get('/informasi', (req, res) => {
  if (!req.session.idUser) {
    res.redirect('/login')
  } else {
    res.render('user/informasi', {
      layout: 'layouts/user',
      title: 'Informasi',
      error: req.flash('error'),
    })
  }
})

router.get('/recovery', (req, res) => {
  if (!req.session.idUser) {
    res.render('user/recovery', {
      layout: 'layouts/user',
      title: 'Password Recovery',
      error: req.flash('error'),
    })
  } else {
    res.redirect('/')
  }
})

router.get('/', (req, res) => {
  res.render('user/index', {
    layout: 'layouts/user',
    title: 'Home',
    error: req.flash('error'),
  })
})

router.get('/:id', async (req, res) => {
  if (!req.session.idUser) {
    res.redirect('/login')
  } else {
    const detail = await Riwayat.findOne({ id: req.params.id })

    if (!detail) {
      return res
        .status(404)
        .send(
          '<h2 style="color: rgba(220, 53, 69, 0.9);margin-left: 30%; margin-top: 10rem;">404: Page Not Found</h2>'
        )
    }

    res.render('user/detail', {
      layout: 'layouts/user',
      title: 'Eye X Sys',
      detail,
      error: req.flash('error'),
    })
  }
})

router.get('/403', (req, res) => {
  return res
    .status(403)
    .send(
      '<h2 style="color: rgba(220, 53, 69, 0.9);margin-left: 30%; margin-top: 10rem;">403: Access Forbidden!</h2>'
    )
})
// router.get('/verification', (req, res) => {
//     if(!req.session.idUser){
//         res.render('user/verification', {layout: 'layouts/user', title: 'Verification Code', error: req.flash('error')})
//     }
//     else{
//         res.redirect('/login')
//     }
// })

// router.get('/hasil', async (req, res) => {
//     if(!req.session.idUser){
//         res.redirect('/login')
//     }
//     else{
//         const semuaRiwayat = await Riwayat.find()
//         const riwayat = semuaRiwayat[semuaRiwayat.length - 1]

//         res.render('user/hasil', {layout: 'layouts/user', title: 'Hasil', riwayat, error: req.flash('error')})
//     }
// })

module.exports = router
