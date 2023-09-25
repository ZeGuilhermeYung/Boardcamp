import { connection } from "../database/database.js";

async function readCustomers(req, res) {
    const { cpf } = res.locals;

    try {
        const customers = (await connection.query("SELECT * FROM customers;")).rows;

        res.send(customers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function readSingleCustomer(req, res) {
    const { customer } = res.locals;

    res.send(customer);
}

async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.body;

    try {
        await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);", [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function updateCustomer(req, res) {
    const { customer } = res.locals;
    const { name, phone, cpf, birthday } = res.locals.body;

    try {
        await connection.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;", [name, phone, cpf, birthday, customer.id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    readCustomers,
    readSingleCustomer,
    createCustomer,
    updateCustomer
}