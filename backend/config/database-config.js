import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

const tryConnect = async (uri) => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected successfully to ${uri}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB connection failed for ${uri}: ${error.message}`);
    return false;
  }
};

export const connectDB = async () => {
  const defaultLocalUri = "mongodb://127.0.0.1:27017/night-coding-marathon";
  const uris = [
    process.env.MONGODB_URI,
    process.env.MONGODB_URI === defaultLocalUri ? null : defaultLocalUri,
  ].filter(Boolean);

  for (const uri of uris) {
    const connected = await tryConnect(uri);
    if (connected) return;
  }

  try {
    memoryServer = await MongoMemoryServer.create();
    const mongoUri = memoryServer.getUri();

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ Connected to in-memory MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw new Error(
      "Unable to connect to MongoDB. Install/launch MongoDB or set a valid MONGODB_URI.",
    );
  }
};
