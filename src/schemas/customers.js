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
    birthday: joi.string()
        .format(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
        .less("now")
        .required()
});

export {
    searchCustomerSchema,
    customerSchema
};