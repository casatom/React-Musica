var express = require('express');
var router = express.Router();
var mailsModel = require('./../../models/mailsModel')

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

    //TODO mandar mail primero

    var resultado = await mailsModel.insertMails(nombre,	texto,	emailEmisor);

    if (resultado) {
      //alert('se envio un mensaje al administrador')
      res.render('users/contacto',{
        layout: 'users/layout',
        nombre: req.session.nombre,
        conocido: 1,
        envioCorrecto:1
      });
    } else {
      //alert('ocurrio un error al guardar su mensaje')
      res.render('users/contacto',{
        layout: 'users/layout',
        nombre: req.session.nombre,
        conocido: 1,
        envioError:1
      });
    }
  } catch (error) {
    console.log(error);
    //alert('ocurrio un error al enviar su mensaje')
    res.render('users/contacto',{
      layout: 'users/layout',
      nombre: req.session.nombre,
      conocido: 1,
      envioError:1
    });
  }
});

module.exports = router;
