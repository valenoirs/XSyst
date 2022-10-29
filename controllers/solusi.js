const { v4: uuid } = require("uuid");

const Solusi = require("../models/solusi");

module.exports.solusiAdd = async (req, res) => {
  const solusi = await Solusi.find();

  const solusiAdd = [
    {
      id: uuid(),
      rules: ["G01", "G02", "G03", "G05", "G07", "G08"],
      penyakit: "Rabun Jauh",
      keterangan:
        "Pengobatan pada miopi dapat dipilih sesuai dengan usia, tingkat keparahan, serta kondisi pengidap. Jenis penanganan yang dilakukan bagi rabun jauh dapat berupa Operasi dengan sinar laser, Implantasi lensa buatan, Penggunaan kacamata atau lensa kontak.",
    },
    {
      id: uuid(),
      rules: ["G01", "G02", "G03", "G06", "G07"],
      penyakit: "Rabun Dekat",
      keterangan:
        "Lensa kontak digunakan untuk mengatasi penyakit ini serta mempunyai fungsi sama seperti kacamata, juga ada Operasi yang paling dapat diandalkan untuk mengatasi kondisi ini adalah operasi laser. Pengidap yang telah menjalani operas laser, tidak perlu dilakukan rawat inap di rumah sakit.",
    },
    {
      id: uuid(),
      rules: ["G01", "G03", "G08"],
      penyakit: "Silinder",
      keterangan:
        "Menggunakan lensa korektif yang dipasang pada kacamata atau lensa kontak membantu menyesuaikan lengkungan kornea atau lensa yang tidak rata. Selain itu Operasi refraktif dapat mengatasi mata silinder dengan memberbaiki bentuk permukaan mata Anda.",
    },
    {
      id: uuid(),
      rules: ["G01", "G05", "G06", "G07", "G08", "G09"],
      penyakit: "Mata Tua",
      keterangan:
        "Lakukan pemeriksaan ke dokter mata jika penglihatan kabur ketika membaca atau melakukan aktivitas normal lain. Dokter akan menjalankan pemeriksaan mata untuk menentukan apakah Anda mengalami presbiopi atau gangguan mata yang lain.",
    },
    {
      id: uuid(),
      rules: ["G03", "G04", "G10", "G11", "G12", "G13"],
      penyakit: "Katarak",
      keterangan:
        "Pengobatan katarak dengan tujuan untuk memulihkan penglihatan adalah dengan cara mengeluarkan lensa yang mengalami kekeruhan, yaitu dengan tindakan operasi.",
    },
    {
      id: uuid(),
      rules: ["G04", "G11", "G14", "G15", "G16"],
      penyakit: "Glaukoma",
      keterangan:
        "Penggunaan obat tetes mata baik dilakukan untuk mengurangi pembentukan cairan pada mata karena adanya penekanan. Selain penggunaan obat tetes mata, untuk kasus yang lebih parah dapat dilakukan tindakan operasi ataupun laser.",
    },
    {
      id: uuid(),
      rules: ["G01", "G17", "G18"],
      penyakit: "Ablasio",
      keterangan:
        "Retina yang sobek biasanya dapat diatasi dengan prosedur sederhana tanpa operasi (dilakukan di ruang periksa dokter). Tujuan pengobatan adalah mencegah retina menjadi lepas seutuhnya. Tapi untuk kasus yang parah harus diambil tindakan operasi. Sebaiknya segera melakukan pemeriksaan kepada ahli",
    },
    {
      id: uuid(),
      rules: ["G01", "G04", "G19", "G20"],
      penyakit: "Konjungtivitis",
      keterangan:
        "Pada konjungtivitis Antibiotik tunggal seperti gentamisisn, kloramfenikol, polimiksin dan sebagainya selama 3-5 hari atau tetes mata antibiotik spektrum tiap jam disertai salep mata 4-5 kali sehari.",
    },
  ];

  if (solusi.length === 0) {
    {
      Solusi.insertMany(solusiAdd)
        .then(() => {
          console.log("Solusi Added");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    console.log("Solusi already in db");
  }
};
