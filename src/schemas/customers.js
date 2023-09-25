import joi from "joi";
import joidate from '@joi/date';

joi.extend(joidate);

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
        .format('YYYY-MM-DD')
});

export {
    searchCustomerSchema,
    customerSchema
};