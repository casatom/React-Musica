var express = require('express');
var router = express.Router();
var generosModel = require('./../../models/generosModel')

router.get('/', async(req, res, next) => {


  var generos = await generosModel.getAllGeneros();

  res.render('users/generos',{
    layout: 'users/layout',
    generos: generos,
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
