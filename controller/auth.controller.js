const authController = {}
const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization // Bearer
        if (!tokenString) {
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                throw new Error("invalid tokene")
            }
            // res.status(200).json({status: "success", userId: payload._id})
            req.userId = payload._id;
        })
        next();
    } catch (err) {
        res.status(400).json({status: "fail", message: err.message})
    }
}

module.exports = authController;