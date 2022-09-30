import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import usersRoutes from './routes/users.js';
import hotelsRoutes from './routes/hotels.js';
import authRoutes from './routes/auth.js';
import roomsRoutes from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import cors from 'cors';
import { verifyAdmin } from './utils/verify-token.js';
import { createRoom } from './controllers/Room.js';


dotenv.config();
const app  = express();
const PORT = 5000;

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('/api/rooms',roomsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/hotels',hotelsRoutes);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong.";
    return res.status(errorStatus).json({
        success : false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    });
});

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb");
    }catch(err){    
        throw err;
    } 
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected");
})


app.listen(PORT, ()=> {
    connect()
    console.log(`Server is running on port ${PORT}`);
})