import express from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './env.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/'
}))
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);
connectDB();
export default app;