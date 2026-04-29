import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
    return true; // Return success
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Re-throw to be caught by caller
  }
};

export default connectDB;
