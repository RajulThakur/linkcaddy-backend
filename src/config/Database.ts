import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('Connected to database');
  } catch (error) {
    console.log('Database is not connected');
  }
};
