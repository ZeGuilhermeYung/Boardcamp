import joi from "joi";

const searchCustomerSchema = joi.object({
    cpf: joi.string()
        .empty()
        .trim()
});

const customerSchema = joi.object({
    name: joi.string()
        .empty()
        .trim()
        .required(),
    phone: joi.string()
        .pattern(/^\d+$/)
        .min(10)
        .max(11)
        .required(),
    cpf: joi.string()
        .pattern(/^\d+$/)
        .length(11)
        .required(),
    birthday: joi.date()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
});

export {
    searchCustomerSchema,
    customerSchema
};