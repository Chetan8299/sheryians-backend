const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    req.user = decoded;

    next();
}

module.exports = authenticate;