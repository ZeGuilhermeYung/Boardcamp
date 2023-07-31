import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const { Pool } = pg

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})