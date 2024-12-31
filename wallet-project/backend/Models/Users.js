const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true,
    },
    kycStatus:{
        type:String,
        required:true,
        default:"Verified",
    },
    profilePic:{
        type:String,
        required:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    address: {
        Street: {type: String, default: '' },
        city: { type: String, default: '' },
        State: { type: String, default: '' },
        ZIP: { type: String, default: '' }, // Example: Validates a 5-digit ZIP code
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;