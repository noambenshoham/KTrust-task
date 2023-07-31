// routes/login.ts
import { Request, Response } from 'express';
import { Users } from '../db/Users';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_SECRET_KEY as string;

export async function loginHandler(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username }).maxTimeMS(60000);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        // const isPasswordValid = await bcrypt.compare(password, user.password);

        const isPasswordValid = password === user.password; // TODO: change to compare()

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const jwtPayload: JwtPayload = { userId: user._id, username: user.username, isAdmin: user.admin }
        // If credentials are valid, generate an access token using JWT
        const accessToken = jwt.sign(jwtPayload, jwt_secret_key, { expiresIn: '1h' });

        return res.json({ accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
