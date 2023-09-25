import express from "express";
import { createGame, readGames } from "../controllers/games.js";
import { gameBodyValidation, gameSearchValidation } from "../middlewares/games.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", gameSearchValidation, readGames);
gamesRouter.post("/games", gameBodyValidation, createGame);

export default gamesRouter;