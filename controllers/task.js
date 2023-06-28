import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

const newTask = async (req, res, next) => {
    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user: req.user
    })

    res.status(201).json({
        success: true,
        message: "Task added",
    })
}

const myTask = async (req, res, next) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
        success: true,
        tasks,
    })
}

const updateTask = async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success: true,
        message: "Task Updated",
    })
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();


    res.status(200).json({
        success: true,
        message: "Task Deleted",
    })
}

export { newTask, myTask, updateTask, deleteTask }