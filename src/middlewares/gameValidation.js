import validSchema from "../suports/validSchema.js";
import { gameSchema } from "../suports/schemas.js";

export default function(req, res, next){
    
    const validation = validSchema(gameSchema, req.body);    
    if (!validation.value) return res.sendStatus(400);
    next();
}