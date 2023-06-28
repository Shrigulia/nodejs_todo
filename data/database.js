import mongoose from "mongoose";

// connecting db
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB,
    }).then((c) => console.log(`API Db connected with server - ${c.connection.host}`))
        .catch((e) => console.log(e))
};