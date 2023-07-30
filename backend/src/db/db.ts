import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any;

const dbUrl = process.env.MONGO_URI as string;

const maxRetries = 5;
let retryCount = 0;

const connectToDatabase = () => {
  mongoose.connect(dbUrl, dbOptions)
    .then(() => {
      console.log('Database connected!');
    })
    .catch((error: any) => {
      console.error('MongoDB connection error:', error);
      if (retryCount < maxRetries) {
        retryCount++;
        const retryDelayInMs = 5000; // 5 seconds delay before the next retry
        console.log(`Retrying connection in ${retryDelayInMs / 1000} seconds...`);
        setTimeout(connectToDatabase, retryDelayInMs);
      } else {
        console.error('Max connection retries reached. Exiting...');
        process.exit(1); // Exit the Node.js process with an error code
      }
    });
};

connectToDatabase();
const db = mongoose.connection;

export default db;
