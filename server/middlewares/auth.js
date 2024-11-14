const jwt = require("jsonwebtoken");
const schema = require('../models/UserSchema.js');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(403).send("Access denied.");

        const { sub } = jwt.verify(token, process.env.jwt_secret);
        req.user = await schema.findOne({ discordId: sub });

        if (!req.user) return res.status(404).send("User not found.");
        
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(400).send("Invalid token");
    }
};
