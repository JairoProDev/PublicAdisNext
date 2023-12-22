import { Schema, model, Model, Document } from 'mongoose';

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
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId as any,
        ref: 'User',
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
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

// Check if the model is already compiled to avoid OverwriteModelError

let Ad: Model<AdDocument, {}>;

try {
    Ad = model<AdDocument>('Ad');
} catch (e) {
    Ad = model<AdDocument>('Ad', adSchema);
}
export default Ad;