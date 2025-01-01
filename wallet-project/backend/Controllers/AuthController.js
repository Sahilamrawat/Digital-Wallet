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
        user.wallet.UpiId = req.body.wallet.UpiId || user.wallet.UpiId;
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
                
                address: updatedUser.address,
                wallet: {
                    UpiId: updatedUser.wallet.UpiId,
                    
                },
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
                
                address: user.address,
                kycStatus:user.kycStatus,
                wallet: {
                    UpiId: user.wallet.UpiId,
                    
                },

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

const getUserWallet = async (req, res) => {
    try {
        // Retrieve the user using the ID from the decoded token
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Generate UPI ID if it doesn't exist
        if (!user.wallet.UpiId) {
            const generateUpiId = () => {
                const { userName: name, dob } = user;
            
                if (!name || !dob) return ''; // Ensure necessary fields are available
            
                // Remove spaces and jumble logic
                const jumble = (str) => str.split('').sort(() => Math.random() - 0.5).join('');
                const cleanedName = name.replace(/\s+/g, ''); // Remove all spaces from the name
                const jumbledName = jumble(cleanedName);
                const jumbledDob = jumble(dob.replace(/-/g, '')); // Remove dashes from DOB
            
                return `${jumbledName}${jumbledDob}@pay`;
            };

            const newUpiId = generateUpiId();

            // Update user wallet with generated UPI ID
            user.wallet.UpiId = newUpiId;
            await user.save();
        }

        // Respond with the user data, including the wallet details
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                dob: user.dob,
                address: user.address,
                kycStatus: user.kycStatus,
                wallet: {
                    UpiId: user.wallet.UpiId,
                    balance: user.wallet.balance,
                },
            },
        });
    } catch (err) {
        console.error("Error fetching user wallet:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const updateUserWallet = async (req, res) => {
    try {
        // Retrieve the user using the ID from the decoded token
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Extract transaction details from the request body
        const { balanceChange, transactionType } = req.body;

        // Validate inputs
        if (typeof balanceChange !== 'number' || balanceChange <= 0) {
            return res.status(400).json({ 
                message: "Invalid balance change value. Must be a positive number.", 
                success: false 
            });
        }
        if (!['add', 'send'].includes(transactionType)) {
            return res.status(400).json({ 
                message: "Invalid transaction type. Must be 'add' or 'send'.", 
                success: false 
            });
        }

        // Update the wallet balance based on transaction type
        if (transactionType === 'add') {
            user.wallet.balance += balanceChange; // Add balance
        } else if (transactionType === 'send') {
            if (user.wallet.balance < balanceChange) {
                return res.status(400).json({ 
                    message: "Insufficient balance for the transaction.", 
                    success: false 
                });
            }
            user.wallet.balance -= balanceChange; // Subtract balance
        }

        // Update the lastUpdated timestamp
        user.wallet.lastUpdated = Date.now(); // Set timestamp for when the balance was updated

        // Save the updated user information
        const updatedUser = await user.save();

        // Respond with updated wallet information
        res.status(200).json({
            success: true,
            message: "Wallet updated successfully",
            wallet: {
                UpiId: updatedUser.wallet.UpiId,
                balance: updatedUser.wallet.balance,
                transactionType: transactionType,
                lastUpdated: updatedUser.wallet.lastUpdated, // Include the timestamp in the response
            },
        });
    } catch (err) {
        console.error("Error updating wallet:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
const SendMoney = async (req, res) => {
    try {
        const { SenderUpiId, ReceiverUpiId, Amount } = req.body;

        // Step 1: Retrieve sender user using the UPI ID (from the token or direct UPI ID)
        const senderUser = await UserModel.findOne({ 'wallet.UpiId': SenderUpiId });

        if (!senderUser) {
            return res.status(404).json({ message: "Sender not found", success: false });
        }

        // Step 2: Verify the sender using the token's _id or provided token (JWT check)
        if (senderUser._id.toString() !== req.user._id.toString()) {
            console.log("Sender ID:", senderUser._id.toString());
            console.log("Requester ID:", req.user._id.toString());
            
            return res.status(401).json({ message: "Unauthorized request", success: false });
        }

        // Step 3: Check if sender has sufficient balance
        if (senderUser.wallet.balance < Amount) {
            return res.status(400).json({ message: "Insufficient balance", success: false });
        }

        // Step 4: Find the receiver user by their UPI ID
        const receiverUser = await UserModel.findOne({ 'wallet.UpiId': ReceiverUpiId });

        if (!receiverUser) {
            return res.status(404).json({ message: "Receiver not found", success: false });
        }

        // Step 5: Deduct the amount from the sender's balance
        senderUser.wallet.balance -= Amount;

        // Step 6: Add the amount to the receiver's balance
        receiverUser.wallet.balance += Amount;

        // Step 7: Log the transaction in both sender's and receiver's sendMoney array
        const transaction = {
            SenderUpiId: senderUser.wallet.UpiId,
            ReceiverUpiId: receiverUser.wallet.UpiId,
            Amount,
            Date: new Date(),
        };

        senderUser.wallet.sendMoney.push(transaction);
        receiverUser.wallet.sendMoney.push(transaction);

        // Step 8: Save the updated users
        await senderUser.save();
        await receiverUser.save();

        // Step 9: Respond with a success message
        res.status(200).json({
            success: true,
            message: "Money transferred successfully",
            senderWallet: senderUser.wallet,
            receiverWallet: receiverUser.wallet,
        });
    } catch (err) {
        console.error("Error during money transfer:", err.message);
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
    getUserProfile,
    getUserWallet,
    updateUserWallet,
    SendMoney,
  
}