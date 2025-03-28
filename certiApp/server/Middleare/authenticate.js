import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const cookie = req.headers.cookie;
        console.log("Received Cookie:", cookie);

        if (!cookie) {
            return res.status(401).json({ msg: "Unauthorized access: No token provided" });
        }

        // Extract authToken from cookie
        const cookies = cookie.split(";").map(c => c.trim());
        const authCookie = cookies.find(c => c.startsWith("authToken="));

        if (!authCookie) {
            return res.status(401).json({ msg: "Unauthorized access: Token not found" });
        }

        const token = authCookie.split("=")[1];
        console.log("Extracted Token:", token);

        // Verify the JWT token
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Verified Token:", verified);

        // Attach user info to request
        req.user = verified.username;
        req.role = verified.role;

        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ msg: "Unauthorized access: Invalid token" });
    }
};

export default authenticate;
