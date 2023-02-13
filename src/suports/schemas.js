import joi from 'joi'

export const nameSchema = joi.object({
    name: joi.string().min(1).invalid(" ",'').required()
} )

export const gameSchema = joi.object({
    name: joi.string().pattern(/^[a-zA-Zà-úÀ-Ú]/).required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay:joi.number().min(1).required(), 
    categoryId: joi.number() ,
    image:joi.string(),
})

export const customerSchema = joi.object({
    name: joi.string().pattern(/^[a-zA-Zà-úÀ-Ú]/).required(),
    phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
    cpf:joi.string().pattern(/^[0-9]{11,11}$/).required(),
    birthday: joi.date(),
})

export const rentalsSchema = joi.object({
    customerId:joi.number().min(1).required() ,
    gameId: joi.number().min(1).required(),
    daysRented:joi.number().min(1).required()

})