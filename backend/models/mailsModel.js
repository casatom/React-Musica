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