import mongoose from "mongoose";

const { MONGO_URL, MONGO_USER, MONGO_PASSWD } = process.env;

let connectionString: string;

// Build the correct connection string to authenticate the DB connection.
// If no username and password were provided, use the regular connection string instead.
if (MONGO_USER && MONGO_PASSWD)
    connectionString =
        MONGO_URL.slice(0, 10) +
        MONGO_USER + ":" +
        MONGO_PASSWD + "@" +
        MONGO_URL.slice(10) +
        "?authSource=admin";

else
    connectionString = MONGO_URL;

// Mongoose MongoDB connection
mongoose
    .connect(connectionString)
    .catch(e => {
        console.error("Mongoose connection error: ", e.message);
        process.exit(1);
    });

export default mongoose.connection;