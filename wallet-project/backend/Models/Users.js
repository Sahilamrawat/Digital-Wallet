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
 
    address: {
        Street: {type: String, default: '' },
        city: { type: String, default: '' },
        State: { type: String, default: '' },
        ZIP: { type: String, default: '' }, // Example: Validates a 5-digit ZIP code
    },
    wallet:{
        UpiId:{type:String,unique:true,default:''},
        balance:{type:Number,default:0},
        transactionType:{type:String,default:'add'},
        lastUpdated: { type: Date, default: Date.now },
        sendMoney:[{
            SenderUpiId:{type:String,default:''},
            ReceiverUpiId:{type:String,default:''},
            Amount:{type:Number,default:0},
            Date:{type:Date,default:Date.now},
        
        }],
        weeklyTransactions: {
            type: Map,
            of: Number,
            default: () => new Map([
                ["Monday", 0],
                ["Tuesday", 0],
                ["Wednesday", 0],
                ["Thursday", 0],
                ["Friday", 0],
                ["Saturday", 0],
                ["Sunday", 0],
            ]),
        },
    },
    
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;