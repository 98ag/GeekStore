import express from "express";
import LoginController from "../controllers/LoginController";
import verifyToken from "../middleware/VerifyToken";

export const loginRouter = express.Router();

loginRouter.post("/signup", LoginController.signUp);
loginRouter.post("/login", LoginController.logIn);
// verifyToken(false, false): doesn't check for valid token or whether user has admin rights
loginRouter.post("/logout", await verifyToken(false, false), LoginController.logOut);
