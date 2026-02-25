import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect("mongod://127.0.0.1:27017/linkedin");
    console.log("DB connected");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDB;
