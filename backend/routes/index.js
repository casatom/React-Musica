var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('admin/login');
/*
  var conocido = Boolean(req.session.nombre);

  res.render('index',{
    title:'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  })*/
});

module.exports = router;
