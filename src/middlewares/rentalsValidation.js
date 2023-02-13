import validSchema from "../suports/validSchema.js";
import { rentalsSchema } from "../suports/schemas.js";

export default function(req, res, next){
    
    const validation = validSchema(rentalsSchema, req.body);
    if (!validation.value)return res.sendStatus(400);
    next();
}