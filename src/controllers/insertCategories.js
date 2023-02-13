import getItem from "../suports/getItem.js";
import insert from "../suports/insert.js";


export default async function(req, res){
    const name = req.body.name;
    
    try {

        const verifi = await getItem('categories', 'name', `${name}`);

        if(verifi.rows.length>0)return res.sendStatus(409);

        await insert( 'categories ( name )', [`${name}`]);

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(error);
    }

}