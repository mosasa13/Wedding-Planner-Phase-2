import mongoose from "mongoose";
import secrets from "./secrets.js";
const MONGO_URI = secrets.db_url;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongodb connection success!");
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

export default connectDB;
