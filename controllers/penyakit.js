const {v4: uuid} = require('uuid');

const Penyakit = require('../models/penyakit')

module.exports.penyakitAdd = async (req, res) => {
    const penyakit = await Penyakit.find()

    const penyakitAdd = [{
        id: uuid(),
        nama: 'Refraksi Mata',
        rules: ['G01','G02','G03','G05','G06','G07','G08','G09'],
        gejala: [
            'Penglihata buram',
            'Mata mudah tegang dan lelah',
            'Sakit kepala',
            'Benda terlihat kabur jika jarak jauh, tapi terlihat jelas saat dekat',
            'Benda terlihat kabur jika jarak dekat, tapi terlihat jelas saat jauh',
            'Masalah dalam membaca',
            'Kesulitan membaca tulisan dengan cetakan huruf yang halus / kecil',
            'Sudah berusia 40 tahun ',
        ],
        keterangan: 'Kelainan refraksi mata adalah di mana kemampuan mata untuk membiaskan cahaya terganggu dan tidak dapat melihat suatu objek dengan jelas. Ini dapat terjadi saat melihat objek yang dekat, jauh, ataupun keduanya, pasien tidak dapat memfokuskan penglihatan mereka. Kelainan refraksi adalah gangguan penglihatan. Kelainan refraksi dapat diakibatkan oleh cacat/gangguan pada kelengkungan organ mata, yakni kornea dan lensa. Hal ini menyebabkan adanya perubahan pada indeks bias mata dan kelainan panjang sumbu bola mata.',
        pencegahan: [
            'Refraksi Mata',
            'Membaca dalam posisi duduk dengan penerangan cukup, jarak antara mata dengan buku minimal 30 cm',
            'Mengistirahatkan mata setelah 1-2 jam beraktivitas dengan mata (membaca, menonton televisi, menggunakan komputer, dan lain-lain)',
            'Mengkonsumsi makanan yang sehat dan gizi seimbang'
        ],
    },
    {
        id: uuid(),
        nama: 'Katarak',
        rules: ['G03','G04','G10','G11','G12','G13'],
        gejala: [
            'Sakit kepala',
            'Mata terasa nyeri/sakit',
            'Rabun pada malam hari',
            'Penglihatan jauh dan dekat kabur',
            'Penglihatan tidak jelas, seperti terdapat kabut menghalangi objek.',
            'Sering mengganti ukuran kacamata.',
        ],
        keterangan: 'Katarak adalah gangguan penglihatan di mana lensa mata Anda menjadi keruh, seperti berawan dan penglihatan jadi seburam kaca jendela yang berembun. Orang yang mengalami katarak akan merasa seperti selalu melihat kabut atau berasap.Penyebab katarak yang paling umum ditemui adalah akibat proses penuaan atau trauma yang menyebabkan perubahan pada jaringan mata.',
        pencegahan: [
            'Lindungi Mata dari Paparan Sinar Matahari',
            'Jaga Kadar Gula Darah Tetap Norma',
            'Periksa Mata Secara Rutin dan hindari kebiasaan buruk seperti merokok dan mengonsumsi alkohol'
        ]
    },
    {
        id: uuid(),
        nama: 'Glaukoma',
        rules: ['G04','G11','G14','G15','G16'],
        gejala: [
            'Mata terasa nyeri/sakit',
            'Penglihatan jauh dan dekat kabur',
            'Suka melihat pelangi melingkar di lampu atau pusat cahaya',
            'Penglihatan yang makin menyempit hingga akhirnya tidak dapat melihat obyek sama sekali.',
            'Merasa mual dan munah',
        ],
        keterangan: 'Glaukoma adalah kerusakan pada saraf mata akibat tingginya tekanan di dalam bola mata. Penyebab glaukoma adalah kerusakan di saraf mata. Kerusakan tersebut umumnya terkait dengan peningkatan tekanan di mata akibat penumpukan aqueous humour yang mengalir ke seluruh bagian mata.',
        pencegahan: [
            'jaga kesehatan mata sejak dini dengan mengkonsumsi makanan yang mengandung vitamin a dan pemeriksaan kesehatan mata ke dokter secara rutin',
            'Gunakan obat tetes mata yang diresepkan dokter secara teratur',
            'Gunakanlah pelindung mata ',
        ]
    },
    {
        id: uuid(),
        nama: 'Ablasio',
        rules: ['G01','G17','G18'],
        gejala: [
            'Penglihata buram',
            'Hilangnya fungsi penglihatan pada salah satu mata',
            'Terlihat bentuk-bentuk iregular yang melayang-layang atau kilatan cahaya',
        ],
        keterangan: 'Ablasio retina adalah gangguan mata yang terjadi ketika retina (selaput bening di belakang mata), terlepas dari bagian belakang mata penyebab sebagian besar ablasio retina terjadi akibat adanya satu atau lebih robekan-robekan atau lubang-lubang di retina, dikenal sebagai ablasio retina regmatogen',
        pencegahan: [
            'Memeriksakan kesehatan mata secara rutin, terlebih jika memiliki faktor risiko seperti diabetes, hipertensi, atau usia tua. ',
            'Menggunakan alat pelindung pada mata saat berolahraga agar mengurangi risiko cedera serius pada mata.',
            'Segera mengunjungi dokter mata jika muncul floaters, flash atau kilatan cahaya, atau terdapat perubahan apapun pada pandangan.',
            'Rutin memeriksakan mata minimal sekali setiap tahun.',
            'Pemeriksaan harus dilakukan lebih sering jika mengidap diabetes.',
            'Rutin mengontrol kadar gula dan tekanan darah, supaya kondisi pembuluh darah retina tetap sehat.',
            'Gunakan pelindung mata ketika berolahraga atau ketika melakukan aktivitas yang berisiko menderai mata. ',
        ]
    },
    {
        id: uuid(),
        nama: 'Konjungtivitis',
        rules: ['G01','G04','G19','G20'],
        gejala: [
            'Penglihata buram',
            'Mata terasa nyeri/sakit',
            'Mata terasa gatal dan berair',
            'Peka terhadap cahaya',
        ],
        keterangan: 'Konjungtivitis adalah mata merah akibat peradangan pada selaput yang melapisi permukaan bola mata dan kelopak mata bagian dalam (konjungtiva mata). Kondisi ini dapat disebabkan alergi atau infeksi bakteri atau virus.',
        pencegahan: [
            'Jaga kebersihan tangan dan jangan menyentuh mata dengan tangan',
            'Gunakan handuk dan lap bersih setiap hari',
            'Jangan berbagi Handuk dan waslap ',
            'Ganti sarung bantal sesering mungkin',
            'Batasi penggunaan kosmetik mata seperti maskara',
            'Jangan berbagi kosmetik mata atau barang perawatan mata pribadi',
        ]
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