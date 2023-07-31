import { Request, Response } from 'express';
import { Users } from '../db/Users';
import { getUsernameFromRequest } from '../utils';


export async function isAdminHandler(req: Request, res: Response) {
    const username = getUsernameFromRequest(req)
    try {
        const user = await Users.findOne({ username }).maxTimeMS(60000);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isAdmin = user.admin;

        return res.json({ isAdmin });
    } catch (error) {
        console.error('Error during get is admin:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
