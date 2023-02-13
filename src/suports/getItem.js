import connection from "../database/postgres.js";

export default async function(localItens , categori, item,select){
    try {

        if(select){

            const {rows} = await connection.query(`SELECT * FROM ${localItens} WHERE ${categori} = $1`,[item])
            
            return rows;
        }
        const promise = await connection.query(`SELECT * FROM ${localItens} WHERE ${categori} LIKE $1 ;`, [ `${item}%` ] )
        
        return promise;
        
    } catch (error) {

        return error;
    }
}