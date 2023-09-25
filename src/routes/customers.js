import express from "express";
import { createCustomer, readSingleCustomer, readCustomers, updateCustomer } from "../controllers/customers.js";
import { customersSearchValidation, customerBodyValidation, uniqueCustomerValidation, customerIdValidation, customerCPFValidation } from "../middlewares/customers.js";

const customersRouter = express.Router();

customersRouter.get("/customers", customersSearchValidation, readCustomers);
customersRouter.get("/customers/:id", customerBodyValidation, customerIdValidation, readSingleCustomer);
customersRouter.post("/customers", customerBodyValidation, uniqueCustomerValidation, createCustomer);
customersRouter.put("/customers/:id", customerBodyValidation, customerIdValidation, customerCPFValidation, updateCustomer);

export default customersRouter;