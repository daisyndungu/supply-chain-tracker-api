import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

const env = load({
    MONGODB_URL: String,
    MONGODB_PORT: Number,
    MONGODB_DATABASENAME: String
})

const MONGODB_URI = `${env.MONGODB_URL}:${env.MONGODB_PORT}/${env.MONGODB_DATABASENAME}`;

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
