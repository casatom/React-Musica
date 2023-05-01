var express = require('express');
var router = express.Router();
var lanzamientoModel = require('./../../models/lanzamientos');
var generosModel = require('./../../models/generosModel');
var artistasModel = require('./../../models/artistasModel');
var mapeadorImagenes = require('./../../models/mappearImagenes');
var uploader = require('./../../models/uploader');
var uploaderAudio = require('./../../models/uploaderAudio');
var mapeadorAudios = require('./../../models/mappearAudios');

router.get('/', async(req, res, next) =>  {

  var resultados = await lanzamientoModel.getAllLanzamientos();

  resultados = mapeadorImagenes.mapeo(resultados);

  resultados = mapeadorAudios.mapeo(resultados);

  res.render('admin/lanzamientos',{
    layout: 'admin/layout',
    nombre: req.session.nombre,
    lanzamientos: resultados,
    conocido: 1
  });
});


//alta
router.get("/alta", async (req, res, next) => {
  var generos = await generosModel.getAllGeneros();
  var artistas = await artistasModel.getAllArtistas();


  res.render('admin/crearLanzamiento',{
    layout: 'admin/layout',
    generos:generos,
    artistas:artistas,
    nombre: req.session.nombre,
    conocido: 1
  });
});


router.post("/alta", async (req, res, next) => {
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagen = req.body.rutaImagen;
  var artistaId = req.body.artistaIdCreado;
  var generoId = req.body.generoIdCreado;


  console.log("altaa de lanzamientooo---------------- ");

  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("ruta "+ rutaImagen);
  console.log("artistaId "+ artistaId);
  console.log("generoId "+ generoId);
  var resultado =false;


  var lan = {
    nombre: nombre,
    descripcion: descripcion,
    artistaId: artistaId,
    generoId: generoId
  }

  
  if(nombre!=="" && descripcion!=="" && artistaId!=="undefined" && generoId !== "undefined" ){
    if(req.files){
      if(Object.keys(req.files).includes('rutaImagen')){
        var imagen = await uploader.subir(req.files);
        lan["rutaImagen"] = imagen;
      }
      if(Object.keys(req.files).includes('rutaAudio')){
        var audio = await uploaderAudio.subir(req.files);
        lan["rutaAudio"] = audio;
      }
    }
  
    resultado = await lanzamientoModel.insertLanzamientoObj(lan);
  
  }
  // req.files && Object.keys(req.files).length > 0
  

  console.log("resultado : "+resultado)

  if (resultado) {
    
    res.redirect("/admin/lanzamientos");

  } else {
    res.render("admin/crearLanzamiento", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      conocido: 1,
      errorCreacion: 1,
    });
  }
});

//modificar
router.post("/editable", async (req, res, next) => {
  var id = req.body.lanzamientoId;

  
  var generos = await generosModel.getAllGeneros();
  var artistas = await artistasModel.getAllArtistas();

  console.log("Id a Editar: " + id);

  var resultado = await lanzamientoModel.getLanzamiento(id);

  resultado = mapeadorImagenes.mapeoUnico(resultado);
  resultado = mapeadorAudios.mapeoUnico(resultado);

  if (resultado) {
    res.render("admin/editarLanzamiento", {
      layout: "admin/layout",
      generos: generos,
      artistas: artistas,
      lanzamiento: resultado,
      nombre: req.session.nombre,
      conocido: 1,
    });
  } else {
    res.render("admin/editarLanzamiento", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion: 1
    });
  }
});

router.post("/editar", async (req, res, next) => {
  
  var id = req.body.lanzamientoId; 
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagenAnterior = req.body.rutaImagenAnterior;
  var rutaAudioAnterior = req.body.rutaAudioAnterior;
  var artistaId = req.body.artistaIdEditado;
  var generoId = req.body.generoIdEditado;

  console.log("edicion---------------- ");

  console.log("Id a editar: " + id);
  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("artistaId "+ artistaId);
  console.log("generoId "+ generoId);

  
  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen 
   */
  var resultado =false;

  var lan = {
    nombre: nombre,
    descripcion: descripcion,
    artistaId: artistaId,
    generoId: generoId
  }

  if(nombre!=="" && descripcion!=="" && artistaId!==undefined && generoId !== undefined ){
    // req.files && Object.keys(req.files).length > 0
    if(req.files){
        
      console.log("--Files--")
      console.log("file keys "+  Object.keys(req.files))
        
      console.log("--Body--")
      if(Object.keys(req.files).includes('rutaImagen')){
        console.log("rutaImagenAnterior "+ rutaImagenAnterior)
        var imagen = await uploader.modificar(req.files,rutaImagenAnterior);
        lan["rutaImagen"] = imagen;
        console.log("rutaImagen "+ imagen);
      }
      if(Object.keys(req.files).includes('rutaAudio')){
        console.log("rutaAudioAnterior "+rutaAudioAnterior)
        var audio = await uploaderAudio.modificar(req.files, rutaAudioAnterior);
        lan["rutaAudio"] = audio;
        console.log("rutaAudio "+audio)
      }
    }
    resultado = await lanzamientoModel.updateLanzamientoObj(id,lan);
  }


  if(resultado){
    res.redirect("/admin/lanzamientos");
  }
  else{
    //TODO enviar el error
    res.redirect("/admin/lanzamientos");
  }  
});

//eliminar
router.post("/borrar", async (req, res, next) => {

  var id = req.body.lanzamientoId;

  console.log(id);

  
  var lanzamientoBorrado = await lanzamientoModel.getLanzamiento(id);

  var resultado = await lanzamientoModel.deleteLanzamiento(id);

  await uploader.borrar(lanzamientoBorrado.rutaImagen);

  await uploaderAudio.borrar(lanzamientoBorrado.rutaAudio)

  console.log(resultado);

  if (resultado) {
      res.redirect("/admin/lanzamientos");
  } else {
    res.render("/admin/lanzamientos", {
      layout: "admin/layout",
      lanzamientos:await lanzamientoModel.getAllLanzamientos(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion:1
    });
  }
});

module.exports = router;
