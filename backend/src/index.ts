// index.ts
import express from 'express';
import cors from 'cors';
import db from './db/db';
import { authenticateToken, isAdminHandler } from './routes/isAdmin';
import { loginHandler } from './routes/login';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/is_user_admin', authenticateToken, isAdminHandler);
app.post('/login', loginHandler);

// Health check endpoint
app.get('/health_check', (req, res) => {
  res.send('success');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
