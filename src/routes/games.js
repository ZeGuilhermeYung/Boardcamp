import express from "express";
import { createGame, readGames } from "../controllers/games.js";
import { gameBodyValidation, gameSearchValidation } from "../middlewares/games.js";

const router = express.Router();

router.get("/games", gameSearchValidation, readGames);
router.post("/games", gameBodyValidation, createGame);

export default router;