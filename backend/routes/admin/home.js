var express = require('express');
var router = express.Router();
//var usuariosModel = require('./../../models/usuariosModel');

/* GET index admin. */
router.get('/', function(req, res, next) {
  res.render('admin/home',{
    layout: 'admin/layout',
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
