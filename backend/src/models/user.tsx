import mongoose, { Document, Schema, Model } from 'mongoose';

export interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false, // Password is not required during user creation
    }
}, {
    timestamps: true,
});

const User = mongoose.model<UserAttributes>('User', userSchema);

export default User;
