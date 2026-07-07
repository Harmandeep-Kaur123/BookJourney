import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {  //check for proper header format
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }
    const token = authHeader.split(" ")[1];  //extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  //valid, not expired - will return id
    const user = await User.findById(decoded.id).select("-password");  // excluding password from data 
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found.",
        });
    }
    req.user = user;   //attaching user to req - query user without db query
    next();  //move to next controller or middleware
});

export default authMiddleware;