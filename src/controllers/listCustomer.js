import getList from '../suports/getsList.js';
import getItem from '../suports/getItem.js';

export default async function(req, res ){
    try {

        if(req.params.id){
            
            const rows = await getItem("customers","id",req.params.id, true)

            if (!rows[0].id)return res.sendStatus(404);  

            res.send(rows[0]).status(200);

            return;
        };


        if(req.query.cpf){

            const promis = await getItem("customers", "cpf", req.query.cpf )
            res.send(promis.rows).status(200);

            return;
        };

        const promis = await getList("customers", req.query.offset,req.query.limit,req.query.order )

        res.send(promis).status(200);

    } catch (error) {
        res.sendStatus(400) ;      
    }
}