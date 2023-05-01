var express = require("express");
var router = express.Router();
var artistasModel = require("./../../models/artistasModel");
var uploader = require('./../../models/uploader');
var mapeadorImagenes = require('./../../models/mappearImagenes');


router.get("/", async (req, res, next) => {
  var resultados = await artistasModel.getAllArtistas();

  resultados = mapeadorImagenes.mapeo(resultados)

  res.render("admin/artistas", {
    layout: "admin/layout",
    artistas: resultados,
    nombre: req.session.nombre,
    conocido: 1,
  });
});

//alta
router.get("/alta", function (req, res, next) {
  res.render("admin/crearArtista", {
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

  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("ruta " + rutaImagen);
  var resultado = false;


  var artista = {
    nombre: nombre,
    descripcion: descripcion
  }


  if(nombre!=="" && descripcion!==""){
    // req.files && Object.keys(req.files).length > 0
    if(req.files){
      if(Object.keys(req.files).includes('rutaImagen')){
        var imagen = await uploader.subir(req.files);
        artista["rutaImagen"] = imagen;
      }
    }

    resultado = await artistasModel.insertArtistaObj(artista);
  }

  console.log("resultado : " + resultado);

  if (resultado) {
    res.redirect("/admin/artistas");
  } else {
    res.render("admin/crearArtista", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      conocido: 1,
      errorCreacion: 1,
    });
  }
});

//modificar
router.post("/editable", async (req, res, next) => {
  var id = req.body.artistaId;

  //guardar imagen en la ruta correspondiente

  console.log("editandoooo.......");

  console.log("id a editar: " + id);

  var resultado = await artistasModel.getArtista(id);

  console.log(resultado)

  resultado = mapeadorImagenes.mapeoUnico(resultado)

  if (resultado) {
    res.render("admin/editarArtista", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      artista: resultado,
      conocido: 1,
    });
  } else {
    res.render("admin/editarArtista", {
      layout: "admin/layout",
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion: 1
    });
  }
});

router.post("/editar", async (req, res, next) => {
  var id = req.body.artistaId;
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagenAnterior = req.body.rutaImagenAnterior;

  console.log("EDITE ESTO..........")


  console.log("id " + id);
  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("rutaImagenAnterior " + rutaImagenAnterior);
  var resultado = false;

  /**
   * 
   * artistaId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */

  var artista = {
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
        artista["rutaImagen"] = imagen;
        console.log("rutaImagen "+ imagen);
      }
      
    }
    resultado = await artistasModel.updateArtistaObj(artista,id);
  } 

  /*
  resultado = await artistasModel.updateArtista(id,nombre,descripcion,
    await uploader.modificar(req.files,rutaImagenAnterior));
  */

  if (resultado) {
    res.redirect("/admin/artistas");
  } else {
    res.render("admin/artistas", {
      layout: "admin/layout",
      //TODO rever
      artistas: await artistasModel.getAllArtistas(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEdicion: 1,
    });
  }
});

//eliminar
router.post("/borrar", async (req, res, next) => {
  var id = req.body.artistaId;

  console.log(id);

  var artistaBorrado = await artistasModel.getArtista(id);

  var resultado = await artistasModel.deleteArtista(id);

  await uploader.borrar(artistaBorrado.rutaImagen)

  console.log(resultado);

  if (resultado) {
    res.redirect("/admin/artistas");
  } else {
    res.render("admin/artistas", {
      layout: "admin/layout",
      //TODO rever
      artistas: await artistasModel.getAllArtistas(),
      nombre: req.session.nombre,
      conocido: 1,
      errorEliminar: 1,
    });
  }
});

module.exports = router;
