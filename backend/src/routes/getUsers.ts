import { Request, Response } from 'express';
import { Users } from '../db/Users';
import { getUsernameFromRequest } from '../utils';

export async function getUsersHandler(req: Request, res: Response) {
    const username = getUsernameFromRequest(req)
    try {
        const users = await Users.find({ username: { $ne: username } }).maxTimeMS(60000);
        if (!users) {
            return [];
        }

        const usernames = users.map(user => user.username)

        return res.json({ usernames });
    } catch (error) {
        console.error('Error during get users:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
