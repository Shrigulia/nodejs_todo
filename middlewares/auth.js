import { User } from "../models/users.js";
import jwt from 'jsonwebtoken';

export const isAuntheticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first",
        });
    };

    // checking user by token through jwt
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)

    // const user = await User.findById(decoded._id);
    req.user = await User.findById(decoded._id);
    next();
}
