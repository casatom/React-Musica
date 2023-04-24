var cloudinary = require('cloudinary').v2;

function mapeo(resultados){

    resultados = resultados.map(obj =>{
        if(obj.rutaImagen){
          const imagen = cloudinary.image(obj.rutaImagen,{
            width:100,
            height:100,
            crop:'fill'
          });
          return{
            ...obj,
            imagen
          }
        }
        else{
          return{
            ...obj,
            imagen: ''
          }
        }
      });

    return resultados;
}

function mapeoUnico(resultado){
    resultado.imagen = cloudinary.image(resultado.rutaImagen,{
        width:100,
        height:100,
        crop:'fill'
    });

    return resultado;
}


module.exports = {mapeo,mapeoUnico}