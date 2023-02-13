import connection from "../database/postgres.js";

export default async function(req, res){

    try {
        const {rows} = await connection.query(`SELECT * FROM rentals WHERE id = $1;`,[req.params.id]);
        if(rows.length===0)return res.sendStatus(404);
        if(rows[0].returnDate===null)return res.sendStatus(400);
        await connection.query('DELETE FROM rentals WHERE id = $1;',[req.params.id]);
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(error);
    }
}