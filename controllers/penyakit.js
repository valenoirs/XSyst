const {v4: uuid} = require('uuid');

const Penyakit = require('../models/penyakit')

module.exports.penyakitAdd = async (req, res) => {
    const penyakit = await Penyakit.find()

    const penyakitAdd = [{
        id: uuid(),
        nama: 'Refraksi Mata',
        gejala: ['G01','G02','G03','G05','G06','G07','G08','G09'],
        keterangan: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.'
    },
    {
        id: uuid(),
        nama: 'Katarak',
        gejala: ['G03','G04','G10','G11','G12','G13'],
        keterangan: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.'
    },
    {
        id: uuid(),
        nama: 'Glaukoma',
        gejala: ['G04','G11','G14','G15','G16'],
        keterangan: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.'
    },
    {
        id: uuid(),
        nama: 'Ablasio',
        gejala: ['G01','G17','G18'],
        keterangan: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.'
    },
    {
        id: uuid(),
        nama: 'Konjungtivitis',
        gejala: ['G01','G04','G19','G20'],
        keterangan: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.'
    }]

    if(penyakit.length === 0){{
        Penyakit.insertMany(penyakitAdd).then(() => {
            console.log('Penyakit Added')
        }).catch((error) => {
            console.log(error)
        });
    }}
    else {
        console.log("Penyakit already in db")
    }
}