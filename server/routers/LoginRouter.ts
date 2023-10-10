import express from "express";

export const loginRouter = express.Router();

loginRouter.get("/login", (req, res, next) => {
    console.log(req.body);
    return res.status(200).json({
        success: true,
        user: req.body.username
    })
})