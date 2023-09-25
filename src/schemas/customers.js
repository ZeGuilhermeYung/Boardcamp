import joi from "joi";

const searchCustomerSchema = joi.object({
    cpf: joi.string()
        .empty("")
        .trim()
});

const customerSchema = joi.object({
    name: joi.string()
        .required(),
    phone: joi.string()
        .pattern(/[0-9]/)
        .min(10)
        .max(11)
        .required(),
    cpf: joi.string()
        .pattern(/[0-9]/)
        .min(11)
        .max(11)
        .required(),
    birthday: joi.date()
        .required()
});

export {
    searchCustomerSchema,
    customerSchema
};