import express from "express";
import { createRental, deleteRental, readRentals, updateRental } from "../controllers/rentals.js";
import { customerIdSearchValidation } from "../middlewares/customers.js";
import { gameIdSearchValidation } from "../middlewares/games.js";
import { rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalIdValidation, rentalNotReturnedValidation, rentalReturnedValidation, rentalsPossibilityValidation } from "../middlewares/rentals.js";

const rentalsRouter = express.Router();

rentalsRouter.post("/rentals", rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalsPossibilityValidation, createRental);
rentalsRouter.get("/rentals", customerIdSearchValidation, gameIdSearchValidation, readRentals);
rentalsRouter.post("/rentals/:id/return", rentalIdValidation, rentalNotReturnedValidation, updateRental);
rentalsRouter.delete("/rentals/:id", rentalIdValidation, rentalReturnedValidation, deleteRental);

export default rentalsRouter;