import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/config.js';
import router from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth',router)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})