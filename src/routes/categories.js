import express from "express";
import { readCategories, createCategory } from "../controllers/categories.js";
import { nameCategoriesValidation } from "../middlewares/categories.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", readCategories);
categoriesRouter.post("/categories", nameCategoriesValidation, createCategory);

export default categoriesRouter;