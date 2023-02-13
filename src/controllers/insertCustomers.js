import getItem from "../suports/getItem.js";
import insert from "../suports/insert.js";

export default async function(req, res){
    const {name, phone, cpf, birthday }= req.body;
  
    try {

        const verifi = await getItem('customers', 'cpf', `${cpf}` );

        if(verifi.rows.length>0)return res.sendStatus(409);

        await insert( 'customers(name, phone, cpf, birthday)', [name, phone, cpf, birthday]) ;

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(400)
    }

}