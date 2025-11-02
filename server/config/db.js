import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async () => {
  try {
    dotenv.config();    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  }
};

connectDB();

export default connectDB;