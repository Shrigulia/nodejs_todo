import express from 'express';
import { getAllUsers, register, getMyprofile, deleteUser, login, logout } from '../controllers/users.js';
import { isAuntheticated } from '../middlewares/auth.js';

const router = express.Router();

// api to get all users 
router.get('/all', getAllUsers);

// api to create new user
router.post('/api/v1/new', register);

// login endpoint
router.post('/api/v1/login', login);

// api to find user by id (get my profile)
router.get("/api/v1/me", isAuntheticated, getMyprofile);

// logout endpoint
router.get("/api/v1/logout", logout);

// api to delete user
router.delete("/api/v1/userbyid/:id", deleteUser);

export default router;