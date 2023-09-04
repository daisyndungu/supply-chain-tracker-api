import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

// TODO(clean up) move to helpers file/folder
const ENV = load({
    PORT: Number,
    MONGODB_URL: String,
    MONGODB_PORT: Number,
    MONGODB_DATABASENAME: String,
    JWT_SECRET_KEY: String,
    JWT_EXPIRES_IN: String,
})

const MONGODB_URI = `${ENV.MONGODB_URL}:${ENV.MONGODB_PORT}/${ENV.MONGODB_DATABASENAME}`;

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    return error
  }
};

export { connectToDatabase, ENV }
