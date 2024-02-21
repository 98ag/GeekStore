import jwt from "jsonwebtoken";
import redisClient from "../db/RedisClient";
import { UserModel } from "../models/UserModel";
import { responseFail } from "../utils/ResponseMessageTemplates";

/**
 * Check for and validate JWT token in the authorization header.
 *
 * @checkAdmin: if true, looks the user up in the database and validates whether they have admin rights
 * @checkValid: if true, returns an error if the JWT token provided is not valid
 */
export default async function verifyToken(checkAdmin: boolean = false, checkValid: boolean = true) {
    return async (req, res, next) => {
        const headers = req.headers["authorization"];
        const token = headers && headers.split(" ")[1];
        // "Authorization" header contains a string 'Bearer xxx.yyy.zzz' where xxx.yyy.zzz is the JWT token

        // Error: token is missing from headers
        if (!token)
            return res
                .status(401)
                .json(responseFail("Se necesita un token en el header Authorization."));

        const inBlacklist = await redisClient.get(`bl_${token}`);

        // Error: token exists in the redis DB (blacklisted, user logged out with that token)
        if (inBlacklist)
            return res
                .status(401)
                .json(responseFail("Token rechazado."));

        jwt.verify(token, process.env.TOKEN_KEY, async (error: any, user: { username: string; exp: number; }) => {
            // Token verification failed and validity condition is true
            if (error && checkValid)
                return res
                    .status(401)
                    .json(responseFail("Token invalido."));

            // Token verified but user sent a protected request without admin rights
            if (checkAdmin) {
                const userDB = await UserModel.findOne({username: user.username}); // Check for isAdmin condition in database
                if (!userDB.isAdmin)
                    return res
                        .status(403)
                        .json(responseFail("No autorizado."));
            }

            req.username = user.username;
            req.tokenExpiration = user.exp;
            req.token = token;
            next();
        });
    }
}
