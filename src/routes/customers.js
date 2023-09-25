import express from "express";
import { createCustomer, readSingleCustomer, readCustomers, updateCustomer } from "../controllers/customers.js";
import { customersSearchValidation, customerBodyValidation, uniqueCustomerValidation, customerIdValidation, customerIdSearchValidation, customerCPFValidation } from "../middlewares/customers.js";

const customersRouter = express.Router();

customersRouter.get("/customers", customersSearchValidation, readCustomers);
customersRouter.get("/customers/:id", customerIdValidation, readSingleCustomer, customerIdSearchValidation);
customersRouter.post("/customers", customerBodyValidation, uniqueCustomerValidation, createCustomer);
customersRouter.put("/customers/:id", customerBodyValidation, customerIdValidation, customerCPFValidation, updateCustomer);

export default customersRouter;