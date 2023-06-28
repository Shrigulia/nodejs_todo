import express from 'express';
import userRouter from './routes/users.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.js';
import cors from 'cors';

export const app = express();

// to access dotenv variables
config({
    path: "./data/config.env",
})

// using middelware
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(cors({
    origin: [process.env.FRONTEND_URL], // domain name like -  www.todo.com
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // it allows to send credentials like seting cookies
    
}));

// error handling middleware
app.use(errorMiddleware)
