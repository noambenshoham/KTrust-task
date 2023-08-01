import express from 'express';
import { Users } from '../../db/Users';

export const deleteUserHandler = async (req: express.Request, res: express.Response) => {
    const { username } = req.params;

    try {
        await Users.deleteOne({ username });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Something went wrong while deleting the user' });
    }
};

