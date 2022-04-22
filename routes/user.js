const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Halaman Utama User');
})

module.exports = router;