import insertCategories from '../controllers/insertCategories.js';
import nameValidation from '../middlewares/nameValidation.js';
import listCategories from '../controllers/listCategories.js';
import express from 'express';


const routeCategories = express.Router();

routeCategories.get("/categories", listCategories);

routeCategories.post("/categories", nameValidation, insertCategories)

export default routeCategories;