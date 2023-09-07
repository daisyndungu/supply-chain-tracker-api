import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

// TODO(clean up) move to helpers file/folder
const ENV = load({
    PORT: Number,
    MONGODB_URL: String,
    JWT_SECRET_KEY: String,
    JWT_EXPIRES_IN: String,
})

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGODB_URL);
  } catch (error) {
    return error
  }
};

export { connectToDatabase, ENV }
