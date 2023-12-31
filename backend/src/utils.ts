import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_SECRET_KEY as string;


export function authenticateToken(req: Request, res: Response, next: any) {
    const token = getTokenFromRequest(req)
    if (token == null) return res.sendStatus(401);


    jwt.verify(token, jwt_secret_key, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.sendStatus(403);
            }
        } next();
    });
}

export function getTokenFromRequest(req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return token
}

interface JwtPayload {
    userId: string;
    username: string;
    isAdmin: boolean;
}

export async function getUsernameFromRequest(req: Request) {
    const token = getTokenFromRequest(req)
    if (token) {
        try {
            const decoded = jwt.verify(token, jwt_secret_key) as JwtPayload;

            return decoded.username;
        } catch (err) {
            console.error('Invalid token:', err as any);
            return null;
        }
    }
}