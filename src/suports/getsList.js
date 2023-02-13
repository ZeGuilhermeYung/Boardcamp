import connection from "../database/postgres.js";
import querys from "./querys.js";

export default async function(table, offset,limit,order){

  try {
    
    const value = querys(offset,limit,order);

    console.log(value);

    const promise = await connection.query(`SELECT * FROM ${table} ${value};`)

    return promise.rows;
    
  } catch (error) {
    return error;    
  }
}