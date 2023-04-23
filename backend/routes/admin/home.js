var express = require('express');
var router = express.Router();
var lanzamientoModel = require('./../../models/lanzamientos');
var artistasModel = require('./../../models/artistasModel');

/* GET index admin. */
router.get('/', async(req, res, next) => {

  var resultadoLanzamientos = await lanzamientoModel.getTop3Lanzamientos();

  var resultadoArtistas = await artistasModel.getTop3Artistas();

  res.render('admin/home',{
    layout: 'admin/layout',
    lanzamientos: resultadoLanzamientos,
    artistas: resultadoArtistas,
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
