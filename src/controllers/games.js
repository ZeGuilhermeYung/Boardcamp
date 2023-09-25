import { connection } from "../database/database.js";

async function readGames(req, res) {
    const { name } = res.locals;

    try {
        if (name) {
            const games = (await connection.query(
                `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`
            )).rows;

            res.send(games);
            return;
        }

        const games = (await connection.query(
            `SELECT
              games.id,
              games.name,
              games.image,
              games."stockTotal",
              games."pricePerDay",
              categories.id AS "categoryId",
              categories.name AS "categoryName"
            FROM
              games
              JOIN categories ON games."categoryId" = categories.id
            WHERE
              games.name ILIKE $1;`, [name]
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