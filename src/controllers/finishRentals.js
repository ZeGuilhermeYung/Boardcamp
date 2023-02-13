import connection from "../database/postgres.js";

export default async function(req, res){
    const date = new Date();
    
    let delayFee=0;

    const returnDate =/(\d{4})[-](\d{2})[-](\d{2})/.exec(date.toISOString())
    
    try {
        const {rows} = await connection.query(`SELECT * FROM rentals WHERE id = $1;`,[req.params.id]);
        
        if(rows.length===0 ) return res.sendStatus(404);
        if( rows[0].returnDate !== null || rows[0].delayFee !== null ) return res.sendStatus(400);
        
        const diff = Math.abs(date.getTime() - rows[0].rentDate.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
        
        if(days>rows[0].daysRented) return delayFee = days-rows[0].daysRented;

        await connection.query(`UPDATE rentals SET "returnDate"=$2, "delayFee"=$3 WHERE id=$1 ` , [req.params.id, returnDate[0], delayFee*rows[0].originalPrice]);

        res.sendStatus(200);
        
    } catch (error) {
        res.sendStatus(400);
    }
}