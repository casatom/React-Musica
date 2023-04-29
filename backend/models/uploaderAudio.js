var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

async function subir(files){

  var rutaAudio='';
  if(files && Object.keys(files).length > 0){
    audio = files.rutaAudio;
    console.log("EL AUDIO QUE SUBO ES "+audio)
    rutaAudio = (await uploader(audio.tempFilePath)).public_id
    console.log("SUBI EL AUDIO");
  }

  return rutaAudio;
}

async function modificar(files,rutaAudioAnterior){
    await borrar(rutaAudioAnterior);
    return await subir(files)
}

async function borrar(rutaAudio){
    if(rutaAudio || rutaAudio === undefined){
        await (destroy(rutaAudio))
        console.log("BORRE EL AUDIO")
    }
}






module.exports = {subir,modificar,borrar}