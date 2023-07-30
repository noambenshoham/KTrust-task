import { Request, Response } from 'express';
import { Users } from '../db/Users';
import jwt from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_SECRET_KEY as string;

export function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwt_secret_key, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

export async function isAdminHandler(req: Request, res: Response) {
    const { username } = req.query;

    try {
        const user = await Users.findOne({ username }).maxTimeMS(60000);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isAdmin = user.admin;

        return res.json({ isAdmin });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
