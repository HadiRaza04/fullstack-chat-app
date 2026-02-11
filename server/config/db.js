import mongoose from "mongoose"
import { MONGODB_URI } from "../env.js"

const connectDB = () => {
    try {
        mongoose.connect(MONGODB_URI)
        .then(() => console.log("Database connected."))
        .catch(err => console.log(err.message))
    } catch (error) {
        console.log("Database connection fails ", error.message);
    }
}
export default connectDB;