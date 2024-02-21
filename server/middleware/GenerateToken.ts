import jwt from "jsonwebtoken";

/**
 * Generates a JWT token. The token payload contains the username and isAdmin values.
 * The secret key TOKEN_KEY and expiration time TOKEN_TIME are stored in the .env file.
 */
export default function generateToken(username: string, isAdmin: boolean) {
    try {
        const payload = { username, isAdmin };
        const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_TIME });
        return { error: false, token };
    } catch (err) {
        return { error: true };
    }
}