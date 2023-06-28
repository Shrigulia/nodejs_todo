import jwt from 'jsonwebtoken';

const sendCookie = (user, res, message, statusCode = 200) => {
    // using jwt for security purpose to store token in cookie
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN) // this _id is that mongodb generate on it own; 
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV === "Development");
    //we are here loging in at same time after signup
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message,
    });
};

export { sendCookie };