const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const headerToken =  req.headers["authorization"]
        console.log(req.headers)
       
        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        

        console.log(headerToken);

        jwt.verify(headerToken, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                console.error("Error verifying token:", error.message);
                return res.status(401).json({ message: "Invalid token" });
            }
            req.userId = decoded.userId;
            req.email=decoded.email;
            console.log("Decoded token:", decoded);
            next();
           
        });
        
        
    }
    catch (error) {
        next(error)
    }
}

 module.exports = verifyToken
