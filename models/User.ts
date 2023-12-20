import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    role: 'Advertiser' | 'Seeker' | 'Affiliate' | 'Creator';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: { 
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['Advertiser', 'Seeker', 'Affiliate', 'Creator'],
        default: 'Seeker',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = model<User>('User', userSchema);

export default User;
