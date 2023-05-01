var pool = require("./bd");

async function getAllArtistas() {
  try {
    var query = "select * from artistas order by fechaAlta desc";

    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getTop3Artistas() {
  try {
    var query = "select * from artistas order by fechaAlta desc limit 3";

    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getArtista(id){
    try{
        var query = 'select * from artistas where id = ? limit 1';
        
        var rows = await pool.query(query,[id]);
        return rows[0]; 
    } catch (error) {
        console.log(error);
    }
}

async function insertArtista(
  nombre,	descripcion,	
  rutaImagen = "artista1.jpg"
) {
  var obj = {
    nombre: nombre,
    descripcion: descripcion,
    rutaImagen: rutaImagen,
  };

  try {
    var query = "insert into artistas set ?";

    await pool.query(query, [obj]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function insertArtistaObj(obj){
  try {
    var query = "insert into artistas set ?";

    await pool.query(query, [obj]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateArtista(
  artistaId,
  nombre,	descripcion,	
  rutaImagen 
) {
  var obj = {
    nombre: nombre,
    descripcion: descripcion,
    rutaImagen: rutaImagen,
  };

  try {
    var query = "update artistas set ? where id=?";

    await pool.query(query, [obj, artistaId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateArtistaObj(obj,artistaId){
  try {
    var query = "update artistas set ? where id=?";

    await pool.query(query, [obj, artistaId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteArtista(artistaId) {
  try {
    var query = "delete from artistas where id = ?";

    await pool.query(query, [artistaId]);
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}

module.exports = {
  getAllArtistas,
  getArtista,
  getTop3Artistas,
  deleteArtista,
  updateArtista,
  insertArtista,
  insertArtistaObj,
  updateArtistaObj
};
