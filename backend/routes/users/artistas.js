var express = require('express');
var router = express.Router();
var artistasModel = require('./../../models/artistasModel')

router.get('/', async(req, res, next) => {

  var artistas = await artistasModel.getAllArtistas();

  res.render('users/artistas',{
    layout: 'users/layout',
    artistas: artistas,
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
