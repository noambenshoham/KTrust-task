import express, { Request, Response } from 'express';
import db from './db/db'; 

const app = express();
const port = 3001;

app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
