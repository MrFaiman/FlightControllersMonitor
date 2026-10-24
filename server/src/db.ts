import mongoose from "mongoose";

const connectDB = async () => {
  // MONGO_URI is accepted for compatibility with older deployments.
  const uri = process.env.MONGODB_URI ?? process.env.MONGO_URI;
  if (!uri) throw new Error("MONGODB_URI is required");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  console.log("MongoDB connected");
};

export default connectDB;
