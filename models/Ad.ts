import { Schema, model, Document } from 'mongoose';

interface IAd {
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
    price: number;
    category: string;
    location: string;
    contactInfo: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define interface for the instance methods
interface IAdMethods {
    remove: () => Promise<void>;
}

// Combine the interfaces
type AdDocument = IAd & IAdMethods & Document;

const adSchema = new Schema<AdDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId as any,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
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

const Ad = model<AdDocument>('Ad', adSchema);

export default Ad;