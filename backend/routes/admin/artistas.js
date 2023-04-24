var express = require("express");
var router = express.Router();
var artistasModel = require("./../../models/artistasModel");
var uploader = require('./../../models/uploader');
var mapeadorImagenes = require('./../../models/mappearImagenes');


//TODO modificar la ruta de imagen antes de agregar, editar y despues de buscarla(usar una funcion para agregar la ruta)

//TODO modificar la vista para poner botones de alta, baja y modificacion
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

//TODO agregar el ruteo de alta, baja y modificacion de artistas

//TODO agregar la vista de alta de lanzamientos

//TODO agregar la vista de modificacion de artistas

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
  var rutaImagen = req.body.ruta_imagen;

  

  //guardar imagen en la ruta correspondiente

  console.log("altaa---------------- ");

  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("ruta " + rutaImagen);
  var resultado = false;

  if (nombre && descripcion ) {
    if (nombre != undefined && descripcion != undefined ) {
      resultado = await artistasModel.insertArtista(
        nombre,
        descripcion,
        await uploader.subir(req.files)
      );
    }
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
    res.redirect('/admin/artistas')
  }
});

router.post("/editar", async (req, res, next) => {
  var id = req.body.artistaId;
  var nombre = req.body.nombre;
  var descripcion = req.body.descripcion;
  var rutaImagen = req.body.rutaImagenAnterior;

  console.log("EDITE ESTO..........")


  console.log("id " + id);
  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("rutaImagen " + rutaImagen);

  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */

  
  resultado = await artistasModel.updateArtista(id,nombre,descripcion,
    await uploader.modificar(req.files,rutaImagen));

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
      errorEdicion: 1,
    });
  }
});

module.exports = router;
