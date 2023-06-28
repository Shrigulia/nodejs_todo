import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import { sendCookie } from '../utils/feature.js';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
    const users = await User.find({});

    // fetcing query from url/api 
    const query = req.query;
    // console.log(query)

    res.json({
        success: true,
        users: users
    })
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // checking if user already exist
    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exist",
        });
    }

    // if not creating user 

    // hasing password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfuly", 201)

};

const login = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // checking if user not exist
    user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    };

    // comparing the entered password (by user) to the encrypted password that stored in db
    const isMatch = await bcrypt.compare(password, user.password)

    // if password wrong throwning error
    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    };

    // if everyhting fine
    sendCookie(user, res, `Welcome back ${user.name}`, 200)
};

const getMyprofile = async (req, res) => {
    // const { id } = req.query;
    // const { id } = req.params;

    // const { token } = req.cookies;
    // // console.log(token)

    // if (!token) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Login first",
    //     });
    // };

    // // checking user by token through jwt
    // const decoded = jwt.verify(token,process.env.JWT_TOKEN)

    // const user = await User.findById(decoded._id);

    res.status(200).json({
        success: true,
        user: req.user,
    })
};

const logout = async (req, res) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
    })
}

const deleteUser = async (req, res) => {
    // const { id } = req.query;
    const { id } = req.params;
    const user = await User.findById(id);

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted",
    })
};

export { getAllUsers, register, getMyprofile, deleteUser, login, logout };