var cloudinary = require('cloudinary').v2;

function mapeo(resultados){

    resultados = resultados.map(obj =>{
        if(obj.rutaAudio){
          const audio = cloudinary.url(obj.rutaAudio);
          return{
            ...obj,
            audio
          }
        }
        else{
          return{
            ...obj,
            audio: ''
          }
        }
      });

    return resultados;
}

function mapeoFront(resultados){

  resultados = resultados.map(obj =>{
      if(obj.rutaAudio){
        const audio = cloudinary.url(obj.rutaAudio);
        return{
          ...obj,
          audio
        }
      }
      else{
        return{
          ...obj,
          audio: ''
        }
      }
    });

  return resultados;
}

function mapeoUnico(resultado){
    resultado.audio = cloudinary.url(resultado.rutaAudio);

    return resultado;
}


module.exports = {mapeo,mapeoUnico,mapeoFront}