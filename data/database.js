import mongoose from "mongoose";

// connecting db
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB,
    }).then(() => console.log("API Db connected"))
        .catch((e) => console.log(e))
};