import express from "express";
import cors from "cors";
import db from "./db";
import { productoRouter } from "./routers/ProductoRouter";
import { loginRouter } from "./routers/LoginRouter";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

db.on("error", console.error.bind(console, "Error de conexion: "));
app.use("/api", productoRouter);
app.use("/api", loginRouter);

app.listen(port, () => {
    console.log(`Aplicacion lista: http://localhost:${port}`)
});
