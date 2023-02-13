import connection from '../database/postgres.js'
import querys from '../suports/querys.js';

export default async function(req, res ){
    let name ='%%';
    try {
        const value = querys(req.query.offset,req.query.limit,req.query.order);


        if(req.query.name) name=`%${req.query.name.toLowerCase()}%`;

        const promis = await connection.query(`SELECT games.* , categories.name AS "categoryName" FROM categories JOIN games ON categories."id" = games."categoryId" AND LOWER(games."name") LIKE $1 ${valuevalue};`, [name] )
        
        res.send(promis.rows).status(200);

    } catch (error) {
        
        res.send(error).status(400) ;      
    }
}