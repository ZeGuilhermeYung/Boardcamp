import express from "express";
import categoriesRouter from "./categories.js";
import gamesRouter from "./games.js";
import customersRouter from "./customers.js";
import rentalsRouter from "./rentals.js";

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;