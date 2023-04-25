var express = require("express");
var router = express.Router();
var generosModel = require("./../../models/generosModel");
var uploader = require('./../../models/uploader');
var mapeadorImagenes = require('./../../models/mappearImagenes');

router.get("/", async (req, res, next) => {
  var generos = await generosModel.getAllGeneros();

  generos = mapeadorImagenes.mapeo(generos)

  res.render("admin/generos", {
    layout: "admin/layout",
    generos: generos,
    nombre: req.session.nombre,
    conocido: 1,
  });
});


/*
id	
nombre	
descripcion	
fechaAlta	
rutaImagen	
*/


//alta
router.get("/alta", function (req, res, next) {
  res.render("admin/crearGenero", {
    layout: "admin/layout",
    nombre: req.session.nombre,
    conocido: 1,
  });
});


router.post("/alta", async (req, res, next) => {
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagen = req.body.rutaImagen;

  //guardar imagen en la ruta correspondiente

  console.log("altaa---------------- ");

  console.log("nombre "+nombre);
  console.log("descripcion "+descripcion);
  console.log("ruta "+rutaImagen);
  var resultado;

  if(nombre!=undefined && descripcion!=undefined ){
    resultado = await generosModel.insertGenero(
      nombre,
      descripcion,
      await uploader.subir(req.files)
    );
  }
  else{
    resultado = false;
  }

  console.log("resultado : "+resultado)

  if (resultado) {
    
    res.redirect("/admin/generos");

  } else {
    res.render("admin/crearGenero", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      conocido: 1,
      errorCreacion: 1,
    });
  }
});

//modificar
router.post("/editable", async (req, res, next) => {
  var id = req.body.generoId;

  //guardar imagen en la ruta correspondiente

  var resultado = await generosModel.getGenero(id);

  resultado = mapeadorImagenes.mapeoUnico(resultado);

  if (resultado) {
    res.render("admin/editarGenero", {
      layout: "admin/layout",
      genero: resultado,
      nombre: req.session.nombre,
      conocido: 1,
    });
  } else {
    res.render("/admin/generos", {
      layout: "admin/layout",
      //TODO rever
      generos: await generosModel.getAllGeneros(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion: 1,
    });
    
  }
});

router.post("/editar", async (req, res, next) => {
  
  var id = req.body.generoId; 
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagen = req.body.rutaImagenAnterior;

  console.log("id "+id)
  console.log("nombre "+nombre)
  console.log("descripcion "+descripcion)
  console.log("rutaImagen "+rutaImagen)

  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */

  var resultado = await generosModel.updateGenero(id,nombre,descripcion,
    await uploader.modificar(req.files,rutaImagen));




  if(resultado){
    res.redirect("/admin/generos");
  }
  else{
    res.render("admin/generos", {
      layout: "admin/layout",
      generos: await generosModel.getAllGeneros(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion: 1,
    });
  }  
});

//eliminar
router.post("/borrar", async (req, res, next) => {

  var id = req.body.generoId;

  console.log(id);

  var generoBorrado = await generosModel.getGenero(id);

  var resultado = await generosModel.deleteGenero(id);

  await uploader.borrar(generoBorrado.rutaImagen)

  console.log(resultado);

  if (resultado) {
      res.redirect("/admin/generos");
  } else {
    res.render("/admin/generos", {
      layout: "admin/layout",
      //TODO rever
      generos: await generosModel.getAllGeneros(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEliminar: 1,
    });
  }
});


module.exports = router;
