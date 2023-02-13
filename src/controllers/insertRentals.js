import connection from "../database/postgres.js";
import getItem from "../suports/getItem.js";
import insert from "../suports/insert.js";

export default async function(req, res){
    const {customerId, gameId ,daysRented}= req.body;

    const date = new Date().toISOString();

    const rentDate = /(\d{4})[-](\d{2})[-](\d{2})/.exec(date)

    try {
        const game = await getItem('games',"id", gameId, true);
        
        const list = await getItem('rentals','"gameId"', gameId,true);
        
        if(Number(game[0].stockTotal)<=list.length) return res.sendStatus(400); 

        const {rows} = await connection.query(`SELECT * FROM games WHERE id = $1;`,[gameId])

        await getItem('customers','id', customerId, true )

        await insert( 'rentals("customerId", "gameId" ,"rentDate", "daysRented", "originalPrice", "returnDate","delayFee" )', [customerId, gameId , rentDate[0], daysRented, daysRented * rows[0].pricePerDay, null, null ]) ;

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(400)
    }

}