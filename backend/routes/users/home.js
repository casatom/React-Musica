var express = require('express');
var router = express.Router();
var lanzamientoModel = require('./../../models/lanzamientos');
var artistasModel = require('./../../models/artistasModel');
var mapeadorImagenes = require('./../../models/mappearImagenes');

router.get('/', async(req, res, next) => {

  var resultadoLanzamientos = await lanzamientoModel.getTop3Lanzamientos();

  var resultadoArtistas = await artistasModel.getTop3Artistas();

  
  resultadoLanzamientos = mapeadorImagenes.mapeo(resultadoLanzamientos);
  resultadoArtistas = mapeadorImagenes.mapeo(resultadoArtistas);
  
  res.render('users/home',{
    layout: 'users/layout',
    lanzamientos: resultadoLanzamientos,
    artistas: resultadoArtistas,
    nombre: req.session.nombre,
    conocido: 1
  });
});


module.exports = router;
