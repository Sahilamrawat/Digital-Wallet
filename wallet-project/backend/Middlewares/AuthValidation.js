const Joi = require('joi');
const jwt = require('jsonwebtoken');

const UserModel = require("../Models/Users");
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        dob:Joi.string().isoDate().required(),
        confirmPassword: Joi.string().min(4).max(100).required(),
        phone: Joi.string().min(10).max(10).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        
        return res.status(400)
            .json({ message: "Bad request", error })
            
    }
    next();
}
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decode the token and get user information
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database
            req.user = await UserModel.findById(decoded._id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = {
    signupValidation,
    loginValidation,
    protect
}