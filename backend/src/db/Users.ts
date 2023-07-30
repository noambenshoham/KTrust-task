import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

export const Users = mongoose.model('users', userSchema);