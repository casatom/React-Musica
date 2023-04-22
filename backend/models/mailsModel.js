var pool = require('./bd')

async function getAllMails(){
    try{
        var query = 'select * from mails order by fechaAlta desc';
        
        var rows = await pool.query(query);
        return rows; 
    } catch (error) {
        console.log(error);
    }
}

//id	nombre	texto	emailEmisor	fechaAlta
async function insertMails(nombre,	texto,	emailEmisor){

  var obj = {
    nombre: nombre,
    texto: texto,
    emailEmisor: emailEmisor,
  };

  try {
    var query = "insert into mails set ?";

    await pool.query(query, [obj]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }

}

module.exports = {
    getAllMails,
    insertMails,
  };