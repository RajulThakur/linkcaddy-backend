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
app.use(express.json());


//test route
app.use(`${BASE_URL}/test`, (req, res) => {
  res.send("<h1>This is the test response </h1><br/><h1>Your are connected</h1>");
  console.log('You are connected');
});

// CORS should be before other middleware
app.use(cors(corsOptions));

app.use(cookieParser());

//Connection to MongoDB
connectDB();

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
