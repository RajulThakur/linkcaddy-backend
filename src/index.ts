import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { BASE_URL, corsOptions } from "./config/Config";
import { connectDB } from "./config/Database";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import shareRoutes from "./routes/share.routes";
import { verifyLogin } from "./middleware/auth.middleware";
import userRoutes from "./routes/user.routes";
dotenv.config();

//Middleware
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Connection to MongoDB
connectDB();

//Routes

//Public Routes
app.use(`${BASE_URL}/brain`, shareRoutes);


app.use(`${BASE_URL}`, authRoutes);
//Protected Routes
app.use(`${BASE_URL}`, verifyLogin, userRoutes);
app.use(`${BASE_URL}`, verifyLogin, contentRoutes);

//Server
app.listen(process.env.PORT, () => {
  console.log("Starting...");
  console.log(`App Started - http://localhost:${process.env.PORT}`);
});
