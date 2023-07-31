// db/Users.ts
import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
    admin: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

export const Users = mongoose.model<UserDocument>('User', userSchema);
