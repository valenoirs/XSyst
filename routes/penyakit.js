const express = require('express')
const router = express.Router()

const penyakitController = require('../controllers/penyakit')

// POST
router.post('/rules', penyakitController.tambahRules)
router.post('/keterangan', penyakitController.tambahKeterangan)
router.post('/pencegahan', penyakitController.tambahPencegahan)

// PUT
router.put('/rules', penyakitController.updateRules)
router.put('/keterangan', penyakitController.updateKeterangan)
router.put('/pencegahan', penyakitController.updatePencegahan)

module.exports = router
