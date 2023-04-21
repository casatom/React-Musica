var express = require('express');
var router = express.Router();

//TODO modificar la vista para poner botones de alta, baja y modificacion
router.get('/', function(req, res, next) {
  res.render('admin/lanzamientos',{
    layout: 'admin/layout',
    nombre: req.session.nombre,
    conocido: 1
  });
});

//TODO agregar el ruteo de alta, baja y modificacion de lanzamientos

//TODO agregar la vista de alta de lanzamientos

//TODO agregar la vista de modificacion de lanzamientos

module.exports = router;
