import { connection } from "../database/database.js";
import { gamesSchema, searchGameSchema } from "../schemas/games.js";

async function gameSearchValidation(req, res, next) {
    const { name } = req.query;
    
    if (!name) {
        next();
        return;
    }

    const validation = searchGameSchema.validate({ name }, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    res.locals.name = name;
    next();
}

async function gameBodyValidation(req, res, next) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    const validation = gamesSchema.validate({
        name,
        image,
        stockTotal,
        pricePerDay
    }, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(400).send({ message: errors });
        return;
    }

    try {
        const repeatedGame = (await connection.query(
            "SELECT * FROM games WHERE name = $1;",
            [name]
        )).rows[0];

        if (repeatedGame) {
            res.sendStatus(409);
            return;
        }

        res.locals.body = {
            name,
            image,
            stockTotal,
            pricePerDay
        };
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

async function gameIdSearchValidation(req, res, next) {
    const { gameId } = req.query;
    if (!gameId) {
        next();
        return;
    }

    try {
        const game = (await connection.query("SELECT * FROM games WHERE id = $1;", [gameId])).rows[0];

        if (!game) {
            res.status(404).send({ message: "Game not found" });
            return;
        }

        res.locals.game = game;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    gameSearchValidation,
    gameBodyValidation,
    gameIdSearchValidation
}