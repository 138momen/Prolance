const mongoose = require("mongoose");

// Track connection status globally so Vercel can reuse it
let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    return; // Use existing connection
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
