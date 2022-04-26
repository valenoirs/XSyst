const {v4:uuid} = require('uuid');

const Solusi = require('../models/solusi');

module.exports.solusiAdd = async (req, res) => {
    const solusi = await Solusi.find()

    const solusiAdd = [{
            id: uuid(),
            gejala: ['G01','G02','G03','G05','G06','G07','G08','G09'],
            keterangan: 'Adapun pilihan terapi untuk kelainan refraksi, yaitu kacamata, kontak lensa dan bedah refraktif. Termasuk di dalamnya Laser Assisted In Situ Keratomileusis (Lasik), Trans-PRK, dan Clear lens extraction. Namun kebutuhan mengoreksi kelainan refraksi tergantung dari gejala pasien.',
        },
        {
            id: uuid(),
            gejala: ['G03','G04','G10','G11','G12','G13'],
            keterangan: 'Pengobatan katarak dengan tujuan untuk memulihkan penglihatan adalah dengan cara mengeluarkan lensa yang mengalami kekeruhan, yaitu dengan tindakan operasi.',
        },
        {
            id: uuid(),
            gejala: ['G04','G11','G14','G15','G16'],
            keterangan: 'Penggunaan obat tetes mata baik dilakukan untuk mengurangi pembentukan cairan pada mata karena adanya penekanan. Selain penggunaan obat tetes mata, untuk kasus yang lebih parah dapat dilakukan tindakan operasi ataupun laser.',
        },
        {
            id: uuid(),
            gejala: ['G01','G17','G18'],
            keterangan: 'Retina yang sobek biasanya dapat diatasi dengan prosedur sederhana tanpa operasi (dilakukan di ruang periksa dokter). Tujuan pengobatan adalah mencegah retina menjadi lepas seutuhnya. Tapi untuk kasus yang parah harus diambil tindakan operasi. Sebaiknya segera melakukan pemeriksaan kepada ahli',
        },
        {
            id: uuid(),
            gejala: ['G01','G04','G19','G20'],
            keterangan: 'Pada konjungtivitis Antibiotik tunggal seperti gentamisisn, kloramfenikol, polimiksin dan sebagainya selama 3-5 hari atau tetes mata antibiotik spektrum tiap jam disertai salep mata 4-5 kali sehari.',
        },
    ]

    if(solusi.length === 0){{
        Solusi.insertMany(solusiAdd).then(() => {
            console.log('Solusi Added')
        }).catch((error) => {
            console.log(error)
        });
    }}
    else {
        console.log("Solusi already in db")
    }
}