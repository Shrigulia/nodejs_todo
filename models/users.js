import mongoose from "mongoose";

// cretaing schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        select: false,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// creraing collection
export const User = mongoose.model("User", schema)