import validSchema from "../suports/validSchema.js";
import { customerSchema } from "../suports/schemas.js";

export default function(req, res, next){
    const date = /(\d{4})[-](\d{2})[-](\d{2})/.exec(req.body.birthday);

    try {
        const validation = validSchema(customerSchema, req.body);    
        if (!validation.value || date===null ) return res.sendStatus(400);
        next();
    } catch (error) {
        return res.sendStatus(400);
    }  
}