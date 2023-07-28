
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any; 

const dbUrl = process.env.MONGO_URI as string;

const db = mongoose.createConnection(dbUrl, dbOptions);

export default db;
