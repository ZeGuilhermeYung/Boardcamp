import validSchema from "../suports/validSchema.js";
import { nameSchema } from "../suports/schemas.js";

export default function(req, res, next){
    
    const validation = validSchema(nameSchema, req.body);
    if (!validation.value)return res.sendStatus(400);
    next();
}