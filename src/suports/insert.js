import connection from "../database/postgres.js";

export default async function (localItens , item){
    const lock=[];

    for (let index = 0; index < iten.length; index++) {
        lock.push(`$${index+1}`)
    }
    try {
        
        const promise = await connection.query(`INSERT INTO ${localItens} VALUES (${lock.toString()}) ;`, item )
        
        return promise;
        
    } catch (error) {
        return error;
    }
}