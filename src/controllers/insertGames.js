import getItem from "../suports/getItem.js";
import insert from "../suports/insert.js";


export default async function(req, res){
    
    const { name, image, stockTotal, categoryId, pricePerDay} = req.body
    
    try {

        const verifi = await getItem('games', `name`, `${name}` );

        if(verifi.rows.length>0)return res.sendStatus(409);

        await insert(`games (name, image, "stockTotal", "categoryId", "pricePerDay")`, [name, image,  stockTotal, categoryId,pricePerDay*100])

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(error)
    
    }

}