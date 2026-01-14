import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(process.env.MONGO_URI!, {
    maxPoolSize: 20,
    minPoolSize: 5,
    maxConnecting: 5,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  });
};
