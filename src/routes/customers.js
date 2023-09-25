import express from "express";
import { createCustomer, readSingleCustomer, readCustomers, updateCustomer } from "../controllers/customers.js";
import { customersSearchValidation, customerBodyValidation, uniqueCustomerValidation, customerIdValidation, customerCPFValidation } from "../middlewares/customers.js";

const router = express.Router();

router.get("/customers", customersSearchValidation, readCustomers);
router.get("/customers/:id", customerIdValidation, readSingleCustomer);
router.post("/customers", customerBodyValidation, uniqueCustomerValidation, createCustomer);
router.put("/customers/:id", customerBodyValidation, customerIdValidation, customerCPFValidation, updateCustomer);

export default customersRouter;