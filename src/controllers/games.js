import { connection } from "../database/database.js";

async function readGames(req, res) {
    try {
        const games = (await connection.query(
            "SELECT * FROM games;"
        )).rows;

        res.send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = res.locals.body;

    try {
        await connection.query(
            'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);',
            [name, image, stockTotal, pricePerDay]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    readGames,
    createGame
}