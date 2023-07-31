import { Request, Response } from 'express';
import { Users } from '../../db/Users';
import { getUsernameFromRequest } from '../../utils';

export async function createUserHandler(req: Request, res: Response) {
    //   const username = await getUsernameFromRequest(req);
    try {
        const { newUsername, newPassword, isAdminUser } = req.body;

        const existingUser = await Users.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(409).json({ message: 'Username is already taken.' });
        }

        const newUser = new Users({
            username: newUsername,
            password: newPassword,
            admin: isAdminUser,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User created successfully.', newUser });
    } catch (error) {
        console.error('Error during user creation:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
