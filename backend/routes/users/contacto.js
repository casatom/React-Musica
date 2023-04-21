var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users/contacto',{
    layout: 'users/layout',
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
