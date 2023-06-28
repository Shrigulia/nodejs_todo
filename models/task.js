import mongoose from "mongoose";

// cretaing schema
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //collection refrence
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// creraing collection
export const Task = mongoose.model("Task", schema)