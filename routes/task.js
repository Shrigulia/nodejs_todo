import express from 'express';
import { isAuntheticated } from '../middlewares/auth.js';
import { newTask, myTask, updateTask, deleteTask } from '../controllers/task.js';

const router = express.Router();

// to add new task 
router.post("/newtask", isAuntheticated, newTask);

// to get all my task
router.get("/mytask", isAuntheticated, myTask)

// to update and delete task(its route is "/api/v1/task/:id")
router.route("/:id").put(isAuntheticated, updateTask).delete(isAuntheticated, deleteTask);



export default router;
