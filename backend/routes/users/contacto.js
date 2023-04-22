var express = require('express');
var router = express.Router();
var mailsModel = require('./../../models/mailsModel')
var alert = require('alert')

router.get('/', function(req, res, next) {
  res.render('users/contacto',{
    layout: 'users/layout',
    nombre: req.session.nombre,
    conocido: 1
  });
});

router.post('/', async(req, res, next)=> {
  try {
    var nombre = req.body.nombre;
    var texto = req.body.mensaje;
    var emailEmisor = req.body.correo;

    //mandar mail primero

    var resultado = await mailsModel.insertMails(nombre,	texto,	emailEmisor);

    if (resultado) {
      //TODO mejorar estos alerts
      alert('se envio un mensaje al administrador')
    } else {
      alert('ocurrio un error al guardar su mensaje')
    }
  } catch (error) {
    console.log(error);
    alert('ocurrio un error al enviar su mensaje')
  }
});

module.exports = router;
