import express from 'express';
import { Users } from '../../db/Users';


export const updateUserHandler = async (req: express.Request, res: express.Response) => {
    const { oldUsername, newUsername, newPassword, isAdmin } = req.body;

    try {
        const userToUpdate = await Users.findOne({ username: oldUsername });
        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        userToUpdate.username = newUsername;
        userToUpdate.password = newPassword;
        userToUpdate.admin = isAdmin;
        await userToUpdate.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('User update failed:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};