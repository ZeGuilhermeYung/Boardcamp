import querys from "../suports/querys.js";
import getItem from "../suports/getItem.js";
import connection from "../database/postgres.js"

export default async function(req,res){
        let CustomerId = `customers."id" = rentals."customerId" `;
        let gameID=`games."id"`;

        try {
            const value = querys(req.query.offset,req.query.limit,req.query.order);
            
            if (req.query.gameId) gameID =req.query.gameId;
            if (req.query.customerId){ 

                const rows = await getItem("rentals",`"'customerId'"`,req.params.id,true)
           
                if(rows.length<=0) return res.send([]).status(200);
                
                CustomerId = ` customers."id" = ${req.query.customerId}`
            
            };
            
            const {rows} = await connection.query(`
                            SELECT rentals. *, 
                            customers.name AS "custumersName",
                            customers.id AS "custumersIDS",
                            games.name AS "gameName",
                            categories.name AS "categoryName" 
                            FROM rentals
                                JOIN customers 
                                    ON ${CustomerId} 
                                JOIN games 
                                    ON  rentals."gameId" = ${gameID} 
                                JOIN categories 
                                    ON categories."id" = games."categoryId"
                                    ${value};`)

                                    console.log(rows)

                            
            const list = rows.map((value)=>{ 

            const date = /(\d{4})[-](\d{2})[-](\d{2})/.exec(value.rentDate.toISOString());

            const obj = {...value};
            delete obj.custumersName;
            delete obj.categoryName;
            delete obj.gameName;
            delete obj.rentDate;
            delete obj.custumersIDS;

            return  { customer:{
                        id:value.custumersIDS,
                        name: value.custumersName
                        },
                        game:{
                            id:value.customerId, 
                            name:value.gameName,
                            categoryId:value.gameId,
                            categoryName:value.categoryName
                        },
                        rentDate: date[0],
                        ...obj }
                    })
            
            
            if(req.query.customerId){
                                const aux = list.filter((i)=> Number(i.customerId) === Number(req.query.customerId))
                                return res.send(aux).status(200);
                }
            res.send(list).status(200)
        
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        
        }
}