import getsList from '../suports/getsList.js'

export default async function(req, res ){
    try {
        
        const list = await getsList('categories',req.query.offset, req.query.limit, req.query.order) 

        res.send(list).status(200);
            
    } catch (error) {
        
        res.send(error).status(400) ;      
    }
}