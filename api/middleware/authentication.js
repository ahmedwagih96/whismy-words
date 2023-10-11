const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

// Verify token 

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
}

// Verify Token & Admin 
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAdmin }