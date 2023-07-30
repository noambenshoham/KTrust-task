// index.ts
import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db/db';
import { Users } from './db/Users';
import cors from 'cors';

const jwt_secret_key = process.env.JWT_SECRET_KEY as string;

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    next();
  });
}

app.get('/is_user_admin', authenticateToken, async (req: Request, res: Response) => {
  const { username, password } = req.query;

  try {
    const user = await Users.findOne({ username }).maxTimeMS(60000);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isAdmin = user.admin

    return res.json({ isAdmin });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username }).maxTimeMS(60000);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid = password == user.password // TODO: change to compare()

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, generate an access token using JWT
    const accessToken = jwt.sign({ userId: user._id }, jwt_secret_key, { expiresIn: '1h' });

    return res.json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Health check endpoint
app.get('/health_check', (req: Request, res: Response) => {
  res.send('success');
});



app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
