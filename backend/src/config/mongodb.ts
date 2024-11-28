import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rideDB';
        await mongoose.connect(dbURI);
        console.log('MongoDB connected locally!');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
