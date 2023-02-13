import customersValidation from '../middlewares/customersValidation.js';
import atualizeCustomers from '../controllers/atualizeCustomers.js';
import insertCustomers from '../controllers/insertCustomers.js';
import listCustomers from '../controllers/listCustomer.js';
import express from 'express';


const routeCustomers = express.Router();


routeCustomers.get("/customers", listCustomers);

routeCustomers.get("/customers/:id", listCustomers);

routeCustomers.put("/customers/:id", customersValidation, atualizeCustomers);

routeCustomers.post("/customers", customersValidation, insertCustomers)

export default routeCustomers;