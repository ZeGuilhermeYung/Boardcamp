import gameValidation from '../middlewares/gameValidation.js';
import insertGames from '../controllers/insertGames.js';
import listGames from '../controllers/listGames.js';
import express from 'express';


const routeGames = express.Router();

routeGames.get("/games", listGames);

routeGames.post("/games", gameValidation, insertGames);

export default routeGames;