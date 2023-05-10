var express = require("express");
var router = express.Router();
var artistasModel = require("./../models/artistasModel");
var generosModel = require("./../models/generosModel");
var lanzamientosModel = require("./../models/lanzamientos");
var cloudinary = require("cloudinary").v2;
var mapeadorImagenes = require("./../models/mappearImagenes");
var mapeadorAudios = require("./../models/mappearAudios");
var nodemailer = require("nodemailer");
var mailsModel = require("./../models/mailsModel");

// all artistas
router.get("/artistas", async function (req, res, next) {
  var artistas = await artistasModel.getAllArtistas();

  artistas = mapeadorImagenes.mapeoFront(artistas);

  res.json(artistas);
});

//top 3 artistas
router.get("/artistasTop", async function (req, res, next) {
  var artistas = await artistasModel.getTop3Artistas();

  artistas = mapeadorImagenes.mapeoFront(artistas);

  res.json(artistas);
});

//all lanzamientos
router.get("/lanzamientos", async function (req, res, next) {
  var lanzamientos = await lanzamientosModel.getAllLanzamientos();

  lanzamientos = mapeadorImagenes.mapeoFront(lanzamientos);
  lanzamientos = mapeadorAudios.mapeoFront(lanzamientos);

  res.json(lanzamientos);
});

//top lanzamientos
router.get("/lanzamientosTop", async function (req, res, next) {
  var lanzamientos = await lanzamientosModel.getTop3Lanzamientos();

  lanzamientos = mapeadorImagenes.mapeoFront(lanzamientos);
  lanzamientos = mapeadorAudios.mapeoFront(lanzamientos);

  res.json(lanzamientos);
});

//all generos
router.get("/generos", async function (req, res, next) {
  var generos = await generosModel.getAllGeneros();

  generos = mapeadorImagenes.mapeoFront(generos);

  res.json(generos);
});

router.post("/contacto", async (req, res) => {
  var nombre = req.body.nombreMailer;
  var texto = req.body.mensajeMailer;
  var emailEmisor = req.body.correoMailer;

  const mail = {
    to: "tomas.casa123@gmail.com",
    subject: "Envio de Contacto META",
    html: `${nombre} se contacto a traves de la web y quiere mas informacion a este correo: ${emailEmisor} <br> Además, hizo el siguiente comentario: ${texto}`,
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);
  
  await mailsModel.insertMails(nombre,	texto,	emailEmisor);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

module.exports = router;
