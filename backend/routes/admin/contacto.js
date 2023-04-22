var express = require('express');
var router = express.Router();


//Modificar para ver los mails de los usuarios
router.get('/', function(req, res, next) {
  res.render('admin/contacto',{
    layout: 'admin/layout',
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
