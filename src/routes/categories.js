import express from "express";
import { readCategories, createCategory } from "../controllers/categories.js";
import { nameCategoriesValidation } from "../middlewares/categories.js";

const router = express.Router();

router.get("/categories", readCategories);
router.post("/categories", nameCategoriesValidation, createCategory);

export default categoriesRouter;