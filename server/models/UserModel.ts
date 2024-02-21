import mongoose from "mongoose";

interface userInterface {
    username: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new mongoose.Schema<userInterface>({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
})

export const UserModel = mongoose.model<userInterface>('users', userSchema);