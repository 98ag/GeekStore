import mongoose from "mongoose";

mongoose
    .connect("mongodb://127.0.0.1:27017/storedb") // Url default de MongoDB local
    .catch(e => {
        console.error("Error de conexion: ", e.message);
    })

export default mongoose.connection;