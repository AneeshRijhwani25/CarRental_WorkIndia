const jwt = require("jsonwebtoken");
const { User } = require("../models");
const asyncHandler = require("../utils/asyncHandler");

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({
                status: "Unauthorized request",
                status_code: 401
            });


        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({ where: { id: decodedToken.id } });

        if (!user) {
            res.status(401).json({
                status: "Invalid access token",
                status_code: 401
            });
        }

        req.user = user;

        next();
    } catch (error) {
        next(res.status(401).json({
            status: error.message || "Invalid access token",
            status_code: 401
        }));
    }
});

module.exports = verifyJWT;
