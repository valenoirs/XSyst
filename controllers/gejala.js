const {v4:uuid} = require('uuid')

const Gejala = require('../models/gejala')

module.exports.gejalaAdd = async (req, res) => {
    const gejala = await Gejala.find()

    const gejalaAdd = [{
        id: uuid(),
        kode: 'G01',
        keterangan: 'Penglihatan buram',
    },
    {
        id: uuid(),
        kode: 'G02',
        keterangan: 'Mata mudah tegang dan lelah',
    },
    {
        id: uuid(),
        kode: 'G03',
        keterangan: 'Sakit kepala',
    },
    {
        id: uuid(),
        kode: 'G04',
        keterangan: 'Mata terasa nyeri/sakit',
    },
    {
        id: uuid(),
        kode: 'G05',
        keterangan: 'Benda terlihat kabur jika jarak jauh, tapi terlihat jelas saat dekat',
    },
    {
        id: uuid(),
        kode: 'G06',
        keterangan: 'Benda terlihat kabur jika jarak dekat, tapi terlihat jelas saat jauh',
    },
    {
        id: uuid(),
        kode: 'G07',
        keterangan: 'Masalah dalam membaca',
    },
    {
        id: uuid(),
        kode: 'G08',
        keterangan: 'Kesulitan membaca tulisan dengan cetakan huruf yang halus / kecil',
    },
    {
        id: uuid(),
        kode: 'G09',
        keterangan: 'Sudah berusia 40 tahun ',
    },
    {
        id: uuid(),
        kode: 'G10',
        keterangan: 'Rabun pada malam hari',
    },
    {
        id: uuid(),
        kode: 'G11',
        keterangan: 'Penglihatan jauh dan dekat kabur',
    },
    {
        id: uuid(),
        kode: 'G12',
        keterangan: 'Penglihatan tidak jelas, seperti terdapat kabut menghalangi objek.',
    },
    {
        id: uuid(),
        kode: 'G13',
        keterangan: 'Sering mengganti ukuran kacamata.',
    },
    {
        id: uuid(),
        kode: 'G14',
        keterangan: 'Suka melihat pelangi melingkar di lampu atau pusat cahaya',
    },
    {
        id: uuid(),
        kode: 'G15',
        keterangan: 'Penglihatan yang makin menyempit hingga akhirnya tidak dapat melihat obyek sama sekali.',
    },
    {
        id: uuid(),
        kode: 'G16',
        keterangan: 'Merasa mual dan muntah',
    },
    {
        id: uuid(),
        kode: 'G17',
        keterangan: 'Hilangnya fungsi penglihatan pada salah satu mata',
    },
    {
        id: uuid(),
        kode: 'G18',
        keterangan: 'Terlihat bentuk-bentuk iregular yang melayang-layang atau kilatan cahaya',
    },
    {
        id: uuid(),
        kode: 'G19',
        keterangan: 'Mata terasa gatal dan berair',
    },
    {
        id: uuid(),
        kode: 'G20',
        keterangan: 'Peka terhadap cahaya',
    }]

    if(gejala.length === 0){
        Gejala.insertMany(gejalaAdd)
        console.log('Gejala added!')
    }
    else{
        console.log('Gejala already in db')
    }
}