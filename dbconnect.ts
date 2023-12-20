import mongoose from 'mongoose';

const dbConnect = async () => {
    // check if we are already connected to the database
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    // ensure the MONGO_URI is defined
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }

    // otherwise, create a new connection
    return mongoose.connect(process.env.MONGO_URI);
}

export default dbConnect;