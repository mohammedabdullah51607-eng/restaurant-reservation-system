const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Invalid Token"
            });

        }

    } else {

        return res.status(401).json({
            message: "No Token"
        });

    }

};

const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin Access Only"
        });

    }

    next();

};

module.exports = {
    protect,
    adminOnly
};