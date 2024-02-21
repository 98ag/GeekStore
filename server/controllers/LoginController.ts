import redisClient from "../db/RedisClient";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import generateToken from "../middleware/GenerateToken";
import { responseSuccess, responseFail, responseError } from "../utils/ResponseMessageTemplates";

/**
 * Request body contains username and password. Password is encrypted with BCrypt then the user is stored in database.
 *
 * Possible error codes:
 *  - 400: Invalid request (missing username/password)
 *  - 409: User already exists
 */
const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Error: missing fields or incomplete fields in the request body
        if (! (username && password))
            return res
                .status(400)
                .json(responseFail({ username: "Campo requerido.", password: "Campo requerido.", }));

        const userDB = await UserModel.findOne({ username: username });

        // Error: user already exists
        if (userDB)
            return res
                .status(409)
                .json(responseFail("El usuario ya existe."));

        const encryptedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username: username.toLowerCase(),
            password: encryptedPassword
        });

        return res
            .status(201)
            .json(responseSuccess({ username: username }));

    } catch (err) {
        return res
            .status(400)
            .json(responseError(err));
    }
}

/**
 * Extracts username and password from body request.
 *
 * If username and bcrypt encrypted password match with a database entry, return success status and an object
 * in the data field with the following information:
 *  - username: Username
 *  - token: JWT Token
 *  - expiration: Expiration date
 *  - isAdmin: Boolean value (true if username has admin rights)
 *
 * Possible error codes:
 *  - 400: Incomplete fields
 *  - 404: Username not found in the database
 *  - 401: Wrong password
 */
const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Error: required fields not present or empty
        if (! (username && password))
            return res
                .status(400)
                .json(responseFail({ username: "Campo requerido", password: "Campo requerido", }));

        const userDB = await UserModel.findOne({ username });

        // Error: Username provided is not in the database
        if (!userDB)
            return res
                .status(404)
                .json(responseFail("El usuario ingresado no existe"));

        if (userDB && await bcrypt.compare(password, userDB.password)) {
            const {error, token} = generateToken(username, userDB.isAdmin);

            // Internal error: JWT generation failed
            if (error)
                return res
                    .status(500)
                    .json(responseError(error));

            // Date of login + token expiration time = token expiration date.
            // Date.now() returns current date in milliseconds (since epoch), token expiration time is in seconds.
            let t = Math.round(Date.now() / 1000) + parseInt(process.env.TOKEN_TIME);
            const data = {
                    username: username,
                    expiration: t,
                    isAdmin: userDB.isAdmin,
                    token: token,
            };

            return res
                .status(200)
                .json(responseSuccess(data));
        }

        // Error: wrong password
        return res
            .status(401)
            .json(responseFail("Credenciales incorrectas."));

    } catch (err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

/**
 * If a token was provided in the authorization header, checks whether it's expired. If not, it's added to the Redis database
 *  for as long as it's not expired, which acts as a blacklist, rendering the token unusable. No token verification/admin check required.
 */
const logOut = async (req, res) => {
    try {
        const { tokenExpiration, token } = req;
        const currentTimeSeconds = Math.round(Date.now() / 1000);

        if (tokenExpiration && tokenExpiration <= currentTimeSeconds) {
            const tokenKey = `bl_${token}`;
            // stored in redis as 'bl_token: token' key value pairs
            await redisClient.set(tokenKey, token);
            await redisClient.expireAt(tokenKey, tokenExpiration);
        }

        return res
            .status(200)
            .json(responseSuccess("Sesion cerrada."));

    } catch (err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

const loginController = { signUp, logIn, logOut };

export default loginController;