var pool = require('./bd')

async function getAllLanzamientos(){
    try{
        var query = 'select * from canciones order by fechaAlta desc';
        
        var rows = await pool.query(query);
        return rows; 
    } catch (error) {
        console.log(error);
    }
}

async function getTop3Lanzamientos(){
    try{
        var query = 'select top 3 * from canciones order by fechaAlta desc';
        
        var rows = await pool.query(query);
        return rows; 
    } catch (error) {
        console.log(error);
    }
}

async function getLanzamiento(id){
    try{
        var query = 'select * from canciones where id = ? limit 1 order by fechaAlta desc';
        
        var rows = await pool.query(query,[id]);
        return rows[0]; 
    } catch (error) {
        console.log(error);
    }
}

//TODO insert (PROBAR)
async function insertLanzamiento(nombre, descripcion, artistaId, generoId, rutaImagen = 'lanzamiento(1).jpg'){

    var obj ={
        nombre: nombre,
        descripcion: descripcion,
        artistaId: artistaId,
        generoId: generoId,
        rutaImagen:rutaImagen
    }

    try{
        var query = 'insert into canciones set ?';
        
        await pool.query(query, [obj]);
        
        return true; 
    } catch (error) {
        console.log(error);
        return false;
    }
}

//TODO update (PROBAR)
async function updateLanzamiento(lanzamientoId, nombre, descripcion, artistaId, generoId , rutaImagen = 'lanzamiento(1).jpg'){
    
    var obj ={
        nombre: nombre,
        descripcion: descripcion,
        artistaId: artistaId,
        generoId: generoId,
        rutaImagen:rutaImagen
    }

    try{
        var query = 'update canciones set ? where id=?';
        
        await pool.query(query,[obj,lanzamientoId]);
        return true; 
    } catch (error) {
        console.log(error);
        return false;
    }
}


//TODO delete (PROBAR)
async function deleteLanzamiento(lanzamientoId){
    try{
        var query = 'delete from canciones where id = ?';
        
        await pool.query(query, [lanzamientoId]);
        return true; 
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {getAllLanzamientos,getLanzamiento,getTop3Lanzamientos,insertLanzamiento,deleteLanzamiento,updateLanzamiento}