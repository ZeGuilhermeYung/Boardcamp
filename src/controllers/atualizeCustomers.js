import connection from "../database/postgres.js";

export default async function(req, res){

    const {name, phone, cpf, birthday }= req.body;

    try {
        await connection.query(`UPDATE customers SET name=$2, phone=$3, cpf=$4, birthday=$5 WHERE id=$1 ` , [req.params.id, name, phone, cpf, birthday]);
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(400);   
    }  
}