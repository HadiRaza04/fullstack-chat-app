import catchAsyncError from "./catchAsyncError.middleware.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../env.js";
import User from "../models/user.model.js";

const isAuthenticated = catchAsyncError(async(req, res, next) => {
    const token  = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access."
        })
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access."
        })
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
})
export default isAuthenticated;