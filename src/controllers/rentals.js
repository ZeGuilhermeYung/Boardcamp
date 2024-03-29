import database from "../database/database.js";
import dayjs from "dayjs";

async function createRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals.body;
    const { game } = res.locals;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    try {
        await database.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, date, daysRented, null, game.pricePerDay * daysRented, null]);

        res.sendStatus(201);        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function readRentals(req, res) {
    const { customer, game } = res.locals;
    let rentals;

    try {
        if (customer && game) {
            rentals = (await database.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games. to_char(rentDate, 'YYYY-MM-DD') AS rentDate FROM rentals. "gameId" WHERE rentals."customerId" = $1 AND rentals."gameId" = $2;`, [customer.id, game.id])).rows;

        } else if (customer && !game) {
            rentals = (await database.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games. to_char(rentDate, 'YYYY-MM-DD') AS rentDate FROM rentals."gameId" WHERE rentals."customerId" = $1;`, [customer.id])).rows;

        } else if (!customer && game) {
            rentals = (await database.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games. to_char(rentDate, 'YYYY-MM-DD') AS rentDate FROM rentals. "gameId" WHERE rentals."gameId" = $1;`, [game.id])).rows;

        } else {
            rentals = (await database.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games. to_char(rentDate, 'YYYY-MM-DD') AS rentDate FROM rentals. "gameId";`)).rows;
        }

        rentals.forEach(rent => {
            rent.rentDate = dayjs(rent.rentDate).format("YYYY-MM-DD");
        });

        res.send(rentals);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function updateRental(req, res) {
    const { rental } = res.locals;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = (today - rental.rentDate) / (1000 * 60 * 60 * 24);
    let delayFee = 0;

    if (diffDays > rental.daysRented) {
        delayFee = (rental.originalPrice/rental.daysRented) * (diffDays - rental.daysRented);
    }

    try {
        await database.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [today, delayFee, rental.id]);
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteRental(req, res) {
    const { rental } = res.locals;

    try {
        await database.query("DELETE FROM rentals WHERE id = $1;", [rental.id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    createRental,
    readRentals,
    updateRental,
    deleteRental
};