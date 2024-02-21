import { createClient } from 'redis';
import 'dotenv/config';

const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD } = process.env;

// Redis DB connection. Credentials are stored in the .env file.
const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_URL,
        port: (REDIS_PORT as unknown as number), // typecast port to number (otherwise TS thinks it's a string)
    }
});

client.on('error', err => console.log('[Redis Client Error]', err));

const redisClient = await client.connect();

export default redisClient;