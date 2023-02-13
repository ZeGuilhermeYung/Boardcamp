import rentalsValidation from '../middlewares/rentalsValidation.js';
import finishRentals from '../controllers/finishRentals.js';
import insertRentals from '../controllers/insertRentals.js';
import deleteRentals from '../controllers/deleteRentals.js';
import listRentals from '../controllers/listRentals.js';
import express from 'express';


const routeRentals = express.Router();


routeRentals.get("/rentals", listRentals);

routeRentals.delete("/rentals/:id", deleteRentals);

routeRentals.post("/rentals/:id/return", finishRentals);

routeRentals.post("/rentals",rentalsValidation ,insertRentals)

export default routeRentals;