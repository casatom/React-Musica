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
  var resultado = false;


  var genero = {
    nombre: nombre,
    descripcion: descripcion
  }

  

  if(nombre!=="" && descripcion!==""){
    // req.files && Object.keys(req.files).length > 0
    if(req.files){
      if(Object.keys(req.files).includes('rutaImagen')){
        var imagen = await uploader.subir(req.files);
        genero["rutaImagen"] = imagen;
      }
    }
    resultado = await generosModel.insertGeneroObj(genero);
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
  var rutaImagenAnterior = req.body.rutaImagenAnterior;

  console.log("id "+id)
  console.log("nombre "+nombre)
  console.log("descripcion "+descripcion)
  console.log("rutaImagenAnterior "+rutaImagenAnterior)

  var resultado = false;

  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */

  var genero = {
    nombre:nombre,
    descripcion:descripcion,
  }


  if(nombre!=="" && descripcion!=="" ){
    // req.files && Object.keys(req.files).length > 0
    if(req.files){
        
      console.log("--Files--")
      console.log("file keys "+  Object.keys(req.files))
        
      console.log("--Body--")
      if(Object.keys(req.files).includes('rutaImagen')){
        console.log("rutaImagenAnterior "+ rutaImagenAnterior)
        var imagen = await uploader.modificar(req.files,rutaImagenAnterior);
        genero["rutaImagen"] = imagen;
        console.log("rutaImagen "+ imagen);
      }
      
    }
    resultado = await generosModel.updateGeneroObj(genero,id);
  }


/*
  var resultado = await generosModel.updateGenero(id,nombre,descripcion,
    await uploader.modificar(req.files,rutaImagenAnterior));
*/



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
