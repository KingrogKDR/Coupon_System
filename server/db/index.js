import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB CONNECTED: ${conn.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection FAILED: ${error}`);
        throw error;
    }
}

export default connectDB;