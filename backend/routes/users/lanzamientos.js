var express = require('express');
var router = express.Router();
var lanzamientoModel = require('./../../models/lanzamientos');
var mapeadorImagenes = require('./../../models/mappearImagenes');

router.get('/', async(req, res, next) => {

  var resultado = await lanzamientoModel.getAllLanzamientos();

  resultado = mapeadorImagenes.mapeo(resultado);

  console.log(resultado)

  res.render('users/lanzamientos',{
    layout: 'users/layout',
    nombre: req.session.nombre,
    lanzamientos: resultado,
    conocido: 1
  });
});

module.exports = router;
