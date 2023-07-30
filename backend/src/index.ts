// index.ts
import express, { Request, Response } from 'express';
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

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password, '<- user, pass');

  try {
    // Check if the user exists in the database
    console.log('try query to mongo')
    if (db.readyState === 1) {
      console.log('Database connected!');
    } else {
      console.log('Database not connected!');
    }
    const users = await Users.find()

    const user = await Users.findOne({ username }).maxTimeMS(60000);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(password, 'compare', user.password, '>>', password === user.password);
    console.log('password:', JSON.stringify(password));
    console.log('user.password:', JSON.stringify(user.password));

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid = password == user.password // TODO: change to compare()
    console.log(isPasswordValid, '<ispassvalid');

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
