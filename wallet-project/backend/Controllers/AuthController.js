const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/Users");


const signup = async (req, res) => {
    try {
        const { userName, email, password, dob, confirmPassword ,phone} = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ userName, email, password, dob, confirmPassword , phone });
        userModel.password = await bcrypt.hash(password, 10);
        userModel.confirmPassword = await bcrypt.hash(confirmPassword, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                _id:user._id,
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                userName: user.userName
            })
    } catch (err) {
        
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    
    }
}

const updateUserProfile = async (req, res) => {
    try {
        // Retrieve the user using the ID from the decoded token
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Update the user profile fields if provided
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.dob = req.body.dob || user.dob;
        user.profilePic=req.body.dob||user.profilePic;
        user.address = req.body.address || user.address;

        // Update password securely if provided
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user information
        const updatedUser = await user.save();

        // Generate a new JWT token
        const jwtToken = jwt.sign(
            { email: updatedUser.email, _id: updatedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with updated user data and token
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                dob: updatedUser.dob,
                profilePic:updatedUser.profilePic,
                address: updatedUser.address,
            },
            token: jwtToken,
        });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};





const getUserProfile = async (req, res) => {
    try {
        // Retrieve the user using the ID from the decoded token
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Respond with the user data
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                dob: user.dob,
                profilePic:user.profilePic,
                address: user.address,
                kycStatus:user.kycStatus,

            },
        });
    } catch (err) {
        console.error("Error fetching user profile:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

module.exports = {
    signup,
    login,
    updateUserProfile,
    getUserProfile
}