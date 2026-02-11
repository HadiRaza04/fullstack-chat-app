import { COOKIE_EXPIRE, JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../env.js"
import jwt from 'jsonwebtoken';

const generateJWTToken = async (user, message, statusCode, res) => {
    const token = jwt.sign(
        {id: user._id},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    )

    return res.status(statusCode).cookie("token", token, {
        maxAge: COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV !== "development" ? true : false,
    }).json({
        success: true,
        message,
        token
    })
}
export default generateJWTToken;