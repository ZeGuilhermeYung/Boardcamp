import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import pg from "pg"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));