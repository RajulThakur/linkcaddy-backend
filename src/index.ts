import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { BASE_URL, corsOptions } from './config/Config';
import { connectDB } from './config/Database';
import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';
import shareRoutes from './routes/share.routes';
dotenv.config();

//Middleware
const app = express();

// CORS should be before other middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//Connection to MongoDB
connectDB();

//Routes
app.use(`${BASE_URL}/test`, (req, res) => {
  res.json({status:true,message:"You are connected"});
  console.log('You are connected');
});

//Public Routes
app.use(`${BASE_URL}`, authRoutes);
app.use(`${BASE_URL}/brain`, shareRoutes);

//Protected Routes
app.use(`${BASE_URL}`, contentRoutes);

const PORT=process.env.PORT || 4000
//Server
app.listen(PORT, () => {
  console.log('Starting...');
  console.log(`App Started - http://localhost:${PORT}`);
});
