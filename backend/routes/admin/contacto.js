var express = require('express');
var router = express.Router();
var mailsModel = require('./../../models/mailsModel')


//Modificar para ver los mails de los usuarios
router.get('/', async(req, res, next) => {

  var mails = await mailsModel.getAllMails();

  res.render('admin/contacto',{
    layout: 'admin/layout',
    mails: mails,
    nombre: req.session.nombre,
    conocido: 1
  });
});

module.exports = router;
