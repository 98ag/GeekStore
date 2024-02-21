import express from "express";
import cors from "cors";
import { productRouter } from "./routers/ProductRouter";
import { productProtectedRouter } from "./routers/ProductProtectedRouter";
import { loginRouter } from "./routers/LoginRouter";
import 'dotenv/config';
import db from "./db/Mongo";

db.on("error", console.error.bind(console, "Error de conexion: "));

const port = process.env.APP_PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", productRouter);
app.use("/api", loginRouter);
app.use("/api", productProtectedRouter);

app.listen(port, () => {
    console.log(`Aplicacion lista: http://localhost:${port}`);
});