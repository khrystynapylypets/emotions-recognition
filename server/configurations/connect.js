import mongoose from 'mongoose';
import envConfig from './envConfig';

export default async () => {
  try {
    await mongoose.connect(envConfig.DATABASE_URL, { useNewUrlParser: true });
    console.log(`Successfully connected to database!`);
  } catch (error) {
    console.log(error.name + error.description);
    throw error;
  }
};
