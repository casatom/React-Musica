var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

async function subir(files) {
  var rutaAudio = "";
  if (files && Object.keys(files).length > 0) {
    audio = files.rutaAudio;
    console.log("EL AUDIO QUE SUBO ES " + audio.tempFilePath);
    // TODO cambiar el tipo de archivo a video
    rutaAudio = (await uploader(audio.tempFilePath,{resource_type: "video" }).catch(error => console.log(error))).public_id;
    console.log("SUBI EL AUDIO");
  }
  return rutaAudio;
}

async function modificar(files, rutaAudioAnterior) {
  await borrar(rutaAudioAnterior);
  return await subir(files);
}

async function borrar(rutaAudio) {
  try {
    if (rutaAudio || rutaAudio === undefined) {
      await destroy(rutaAudio);
      console.log("BORRE EL AUDIO");
    }
  } catch (error) {
    console.log("borrar error: " + error);
  }
}

module.exports = { subir, modificar, borrar };
