import jwt from "jsonwebtoken";

const authentication =  (req, res, next) => {
    try {
        
        const headers = req.headers.authorization;
        // Log the authorization header for debugging
        
        if (!headers) {
            return res.status(401).send({ status: "failed", message: "Authorization header missing" });
        }
        const token = headers.split(" ")[1];
        if (!token) {
            return res.status(401).send({ status: "failed", message: "Token missing" });
        }
       
      
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("JWT ERROR:", err);
                return res.status(401).send({ status: "failed", message: "Invalid token" });
            }
           
             req.user = decoded; 
              console.log("Decoded user information:", decoded);
            // decoded is the object which contain userid .Attach the decoded user information to the request object
            next(); // Proceed to the next middleware or route handler
        })
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ status: "failed", message: "Token expired" });
        }
    }
};

export default authentication;