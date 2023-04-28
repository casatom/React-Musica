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
  var resultado;

  if(nombre!=undefined && descripcion!=undefined && nombre!=undefined && artistaId!=undefined && generoId!=undefined ){
    resultado = await lanzamientoModel.insertLanzamiento(
      nombre,
      descripcion,
      artistaId,
      generoId,
      await uploader.subir(req.files),
      await uploaderAudio.subir(req.files)
    );
  }
  else{
    resultado = false;
  }

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

  console.log("--Body--")
  console.log("rutaImagen "+ req.body.rutaImagen);
  console.log("rutaAudio "+ req.body.rutaAudio);

  console.log("--Files--")
  console.log("rutaImagen "+ req.files.rutaImagen);
  console.log("rutaAudio "+ req.files.rutaAudio);
  console.log("file keys "+  Object.keys(req.files))

  console.log("rutaImagenAnterior "+ rutaImagenAnterior);
  console.log("rutaAudioAnterior "+ rutaAudioAnterior);
  console.log("artistaId "+ artistaId);
  console.log("generoId "+ generoId);

  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */
  var resultado;

  //TODO hacer una mejor verificacion de que hay archivos 
  //TODO ver porq tarda tanto
  // req.files && Object.keys(req.files).length > 0
  if(false){
    resultado = await lanzamientoModel.updateLanzamiento(id,nombre,descripcion,artistaId,generoId,
      await uploader.modificar(req.files,rutaImagenAnterior),
      await uploaderAudio.modificar(req.files, rutaAudioAnterior));
  }
  else{
    var obj = {
      nombre: nombre,
      descripcion: descripcion,
      artistaId: artistaId,
      generoId: generoId
    }
    resultado = await lanzamientoModel.updateLanzamiento(id,obj)
  }

  if(resultado){
    res.redirect("/admin/lanzamientos");
  }
  else{
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
