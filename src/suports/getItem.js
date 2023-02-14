import connection from "../database/postgres.js";

export default async function(localItens , category, item,select){
    try {

        if(select){

            const {rows} = await connection.query(`SELECT * FROM ${localItens} WHERE ${category} = $1`,[item]);
            
            return rows;
        }
        const promise = await connection.query(`SELECT * FROM ${localItens} WHERE ${category} LIKE $1 ;`, [ `${item}%` ] );
        
        return promise;
        
    } catch (error) {

        return error;
    }
}