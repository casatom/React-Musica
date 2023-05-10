//id,	nombre,	descripcion,	fechaAlta,	rutaImagen	

var pool = require("./bd");

async function getAllGeneros() {
  try {
    var query = "select * from generos order by fechaAlta desc";

    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getGenero(id){
    try{
        var query = 'select * from generos where id = ? limit 1 ';
        
        var rows = await pool.query(query,[id]);
        return rows[0]; 
    } catch (error) {
        console.log(error);
    }
}

async function insertGenero(
    nombre,	descripcion,			
  rutaImagen = "rock.jpg"
) {
  var obj = {
    nombre: nombre,
    descripcion: descripcion,
    rutaImagen: rutaImagen,
  };

  try {
    var query = "insert into generos set ?";

    await pool.query(query, [obj]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function insertGeneroObj(obj){
  try {
    var query = "insert into generos set ?";

    await pool.query(query, [obj]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateGenero(generoId,	nombre,	descripcion,rutaImagen = "rock.jpg") {

  var obj = {
    nombre: nombre,
    descripcion: descripcion,
    rutaImagen: rutaImagen,
  };

  console.log(obj)
  console.log("ID: " + generoId);

  try {
    var query = "update generos set ? where id=?";

    await pool.query(query, [obj, generoId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateGeneroObj(obj,generoId){
  try {
    var query = "update generos set ? where id=?";

    await pool.query(query, [obj, generoId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteGenero(generoId) {
  try {
    var query = "delete from generos where id = ?";

    await pool.query(query, [generoId]);
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}

module.exports = {
  getAllGeneros,
  getGenero,
  deleteGenero,
  updateGenero,
  insertGenero,
  updateGeneroObj,
  insertGeneroObj
};
