var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

async function subir(files){
  var rutaImagen='';
  if(files && Object.keys(files).length > 0){
    imagen = files.rutaImagen;
    console.log("LA IMAGEN QUE SUBO ES " + imagen.tempFilePath);
    rutaImagen = (await uploader(imagen.tempFilePath).catch(error => console.log(error))).public_id
  }

  return rutaImagen;
}

async function modificar(files,rutaImagenAnterior){
    await borrar(rutaImagenAnterior);

    return await subir(files);
}

async function borrar(rutaImagen){

    if(rutaImagen || rutaImagen ===undefined){
        await (destroy(rutaImagen))
    }
}






module.exports = {subir,modificar,borrar}