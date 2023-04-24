var express = require('express');
var router = express.Router();
var lanzamientoModel = require('./../../models/lanzamientos');
var generosModel = require('./../../models/generosModel')
var artistasModel = require('./../../models/artistasModel')



//TODO modificar la vista para poner botones de alta, baja y modificacion
router.get('/', async(req, res, next) =>  {

  var resultados = await lanzamientoModel.getAllLanzamientos();

  res.render('admin/lanzamientos',{
    layout: 'admin/layout',
    nombre: req.session.nombre,
    lanzamientos: resultados,
    conocido: 1
  });
});

//TODO agregar el ruteo de alta, baja y modificacion de lanzamientos

//TODO agregar la vista de alta de lanzamientos

//TODO agregar la vista de modificacion de lanzamientos


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
  var rutaImagen = req.body.ruta_imagen;
  var artistaId = req.body.artistaIdCreado;
  var generoId = req.body.generoIdCreado;

  //guardar imagen en la ruta correspondiente

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
      rutaImagen
    );
  }
  else{
    resultado = false;
  }

  console.log("resultado : "+resultado)

  if (resultado) {
    
    res.redirect("/admin/lanzamientos");

  } else {

    res.redirect("/admin/lanzamientos/alta");
  }
});

//modificar
router.post("/editable", async (req, res, next) => {
  var id = req.body.lanzamientoId;

  
  var generos = await generosModel.getAllGeneros();
  var artistas = await artistasModel.getAllArtistas();

  console.log("Id a Editar: " + id);

  //TODO guardar imagen en la ruta correspondiente

  var resultado = await lanzamientoModel.getLanzamiento(id);

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
  var rutaImagen = req.body.ruta_imagen;
  var artistaId = req.body.artistaIdEditado;
  var generoId = req.body.generoIdEditado;

  console.log("edicion---------------- ");

  console.log("Id a editar: " + id);
  console.log("nombre " + nombre);
  console.log("descripcion " + descripcion);
  console.log("ruta "+ rutaImagen);
  console.log("artistaId "+ artistaId);
  console.log("generoId "+ generoId);

  /**
   * 
   * generoId,	nombre,	descripcion,	
  rutaImagen = "rock.jpg"
   */

  var resultado = await lanzamientoModel.updateLanzamiento(id,nombre,descripcion,artistaId,generoId,rutaImagen);


  if(resultado){
    res.redirect("/admin/lanzamientos");
  }
  else{
    //TODO rever
    res.redirect("/admin/lanzamientos/editable");
  }  
});

//eliminar
router.post("/borrar", async (req, res, next) => {

  var id = req.body.lanzamientoId;

  console.log(id);

  var resultado = await lanzamientoModel.deleteLanzamiento(id);


  console.log(resultado);

  if (resultado) {
      res.redirect("/admin/lanzamientos");
  } else {
    res.render("/admin/lanzamientos", {
      layout: "admin/layout",
      lanzamientos:req.body.lanzamientos,
      conocido: 1,
      errorEdicion:1
    });
  }
});

module.exports = router;
