import express from "express";
import gamesRouter from "./games.js";
import customersRouter from "./customers.js";
import rentalsRouter from "./rentals.js";

const router = express.Router();
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;