import express from "express";
import { readCategories, createCategorie } from "../controllers/categories.js";
import { nameCategoriesValidation } from "../middlewares/categories.js";

const router = express.Router();

router.get("/categories", readCategories);
router.post("/categories", nameCategoriesValidation, createCategorie);

export default router;