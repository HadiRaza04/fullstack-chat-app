import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI; 
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;
export const NODE_ENV = process.env.NODE_ENV;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
